import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { MatTableDataSource } from '@angular/material/table';
import { firebaseService } from '../firebase.service';
import Swal from 'sweetalert2';
import * as _ from 'lodash';

export interface MATHTABLE {
  itemId: number;
  itemName: string;
  price: number;
  quantity: any;
  discount: number;
  tax: number;
  availability: string;
  categories: string;
}
const MATHTABLE_DATA: MATHTABLE[] = [];
@Component({
  selector: 'app-add-order-dialog',
  templateUrl: './add-order-dialog.component.html',
  styleUrls: ['./add-order-dialog.component.css'],
})
export class AddOrderDialogComponent implements OnInit {
  displayedColumns: string[] = [
    'itemName',
    'price',
    'discount',
    'tax',
    'quantity',
  ];
  dataSource = new MatTableDataSource(MATHTABLE_DATA);
  grosstotal: any = 0;
  discount: any = 0;
  tax: any = 0;
  total: any = 0;
  SumQuantity: any = 0;
  grossTotalDisplayValue: any = 0;
  TotalEachItem: any = 0;
  Totaldiscount: any = 0;
  totaltax: any = 0;
  OrderForm!: FormGroup;
  id!: string;
  UID: any = localStorage.getItem('user');
  dt = new Date();
  Type = 'Sales';
  Types = ['Retail', 'Sales'];
  apiResponse!: any[];
  categories!: any;

  constructor(
    private formbuilder: FormBuilder,
    private dialogref: MatDialogRef<AddOrderDialogComponent>,
    public angularFireAuth: AngularFireAuth,
    private api: firebaseService,
    @Inject(MAT_DIALOG_DATA) public editdata: any
  ) {
    this.dataSource = new MatTableDataSource(editdata.selectedItems);
  }

  get OrderDetials() {
    return this.OrderForm.get('orderdetials') as FormArray;
  }

  getOrderDetailsLength() {
    return (this.OrderForm.get('orderdetials') as FormArray).length;
  }
  getOrderDetailsFormControl(orderItemId: string, control: string) {
    const controlIndex = this.OrderForm.value.orderdetials.findIndex(
      (item: any) => item.idd === orderItemId
    );
    return (this.OrderForm.get('orderdetials') as FormArray)
      .at(controlIndex)
      .get(control) as FormControl;
  }

  ngOnInit(): void {
    this.OrderForm = this.createForm(null);
    this.getAllItem();
  }

  createForm(data: any): FormGroup {
    return this.formbuilder.group({
      userID: [data ? data.userID : this.UID],
      operationType: [
        data ? data.operationType : this.Types[0],
        Validators.required,
      ],
      date: [data ? data.date : new Date(), Validators.required],
      address: [data ? data.address : '', Validators.required],
      custname: [data ? data.custname : '', Validators.required],
      nettotal: [data ? data.nettotal : ''],
      grosstotal: [data ? data.grosstotal : ''],
      totaltax: [data ? data.totaltax : ''],
      totaldiscount: [data ? data.totaldiscount : ''],
      quantityTotal: [data ? data.quantityTotal : ''],
      orderdetials: this.formbuilder.array([]),
    });
  }
  // Order detial nested array
  createOrderdetials(data: any[] | null): FormGroup[] {
    return data
      ? data.map((x) => {
          let group = this.formbuilder.group({
            company: [x.company],
            idd: [x.id],
            price: [x.price],
            quantity: [x.quantity],
            grosstotal: [x.grosstotal],
            discount: [x.discount],
            tax: [x.tax],
            total: [x.total],
          });
          return group;
        })
      : [
          this.formbuilder.group({
            company: ['', Validators.required],
            idd: ['', Validators.required],
            price: ['', Validators.required],
            grosstotal: [''],
            quantity: ['', Validators.required],
            discount: ['', Validators.required],
            tax: ['', Validators.required],
            total: ['', Validators.required],
          }),
        ];
  }
  // Filtering Categories method
  FilterCateg($event: any) {
    let FilteredData = _.filter(this.apiResponse, (item) => {
      return (
        item.categories.categoryName == $event.value &&
        item.availability == 'In stock'
      );
    });
    this.dataSource = new MatTableDataSource(FilteredData);
  }
  // Calculation
  onChange(i: number, orderItemId: string) {
    this.grosstotal = 0;
    this.discount = 0;
    this.tax = 0;
    this.total = 0;
    this.SumQuantity = 0;
    this.grossTotalDisplayValue = 0;
    this.TotalEachItem = 0;
    this.Totaldiscount = 0;
    this.totaltax = 0;

    this.OrderForm.value.orderdetials.forEach((element: any, index: number) => {
      if (element.quantity) {
        this.grossTotalDisplayValue +=
          parseInt(element.price) * parseInt(element.quantity);
        this.grosstotal = parseInt(element.price) * parseInt(element.quantity);
        this.discount = this.grosstotal * (element.discount / 100);
        this.Totaldiscount +=
          parseInt(element.price) *
          parseInt(element.quantity) *
          (element.discount / 100);
        this.tax = this.grosstotal * (element.tax / 100);
        this.totaltax +=
          parseInt(element.price) *
          parseInt(element.quantity) *
          (element.tax / 100);
        this.total += this.grosstotal - this.discount + this.tax;
        this.TotalEachItem = this.grosstotal - this.discount + this.tax;
        this.SumQuantity = this.SumQuantity + parseInt(element.quantity);
        this.OrderForm.value.orderdetials[index].grosstotal =
          this.OrderForm.value.orderdetials[index].price *
          this.OrderForm.value.orderdetials[index].quantity;
        this.OrderForm.value.orderdetials[index].total =
          this.OrderForm.value.orderdetials[index].grosstotal -
          this.OrderForm.value.orderdetials[index].grosstotal *
            (this.OrderForm.value.orderdetials[index].discount / 100) +
          this.OrderForm.value.orderdetials[index].grosstotal *
            (this.OrderForm.value.orderdetials[index].tax / 100);
      }
    });
  }

  getAllItem() {
    this.api.GetItems().subscribe((data) => {
      this.apiResponse = data;
      const StockAvailability = data;
      const filter = StockAvailability.filter(
        (item: any) => item.availability == 'In stock'
      );
      this.OrderForm.setControl(
        'orderdetials',
        this.formbuilder.array(this.createOrderdetials(data) || [])
      );
      this.dataSource = new MatTableDataSource(filter);
    });
  }

  AddOrder() {
    if (!this.OrderForm.valid) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Please fill out all the Required Fields,try again.',
        showConfirmButton: false,
        timer: 1300,
      });
    } else {
      this.OrderForm.value.userID = this.UID;
      this.OrderForm.value.grosstotal = parseInt(this.grossTotalDisplayValue);
      this.OrderForm.value.totaldiscount = parseInt(this.Totaldiscount);
      this.OrderForm.value.totaltax = parseInt(this.totaltax);
      this.OrderForm.value.nettotal = parseInt(this.total);
      this.OrderForm.value.quantityTotal = this.SumQuantity;
      const quantityEnter = { ...this.OrderForm.value };
      quantityEnter.orderdetials = quantityEnter.orderdetials.filter(
        (item: any) => item.quantity
      );
      this.api.AddOrders(this.OrderForm.value).subscribe({
        next: (res) => {
          location.reload();
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Order successfully Added!',
            showConfirmButton: false,
            timer: 1300,
          });
        },
        error: (err) => {
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Error Adding Order!!',
            showConfirmButton: false,
            timer: 1300,
          });
        },
      });
      this.OrderForm.reset();
      this.dialogref.close('Saved!');
    }
  }
  GetCategories() {
    this.api.GetCategories().subscribe({
      next: (Categ) => {
        this.categories = Categ;
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }
}
