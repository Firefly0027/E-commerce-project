import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddOrderDialogComponent } from '../add-order-dialog/add-order-dialog.component';
import { firebaseService } from '../firebase.service';
import { MatSort } from '@angular/material/sort';
import { Timestamp } from 'firebase/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { OrderDetialsDialogComponent } from '../order-detials-dialog/order-detials-dialog.component';
import Swal from 'sweetalert2';

export interface OrderTable {
  id: number;
  date: Timestamp;
  address: string;
  custname: string;
  netTotal: number;
  grossTotal: number;
  taxTotal: number;
  discountTotal: number;
  operationType: string;
  quantityTotal: number;
  orderdetials: Detials[] | MatTableDataSource<Detials>;
}
export interface Detials {
  idd: number;
  price: number;
  quantity: number;
  discount: number;
  tax: number;
  total: number;
}
const OrderTable_DATA: OrderTable[] = [];
@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css'],
})
export class OrderTableComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'operationType',
    'date',
    'address',
    'custname',
    'nettotal',
    'grosstotal',
    'totaltax',
    'totaldiscount',
    'quantityTotal',
    'action',
  ];
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([
    OrderTable_DATA,
  ]);
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  UserID = '';

  constructor(
    private api: firebaseService,
    public angularFireAuth: AngularFireAuth,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.GetOrder();
  }

  // Filtering
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Dialog to Show Detials
  openOrderDetialsDialog(id: string) {
    this.dialog.open(OrderDetialsDialogComponent, {
      width: '100vw',
      maxWidth: '50vw',
      data: {
        OrderID: id,
      },
    });
  }

  openAddOrderDialog() {
    this.dialog.open(AddOrderDialogComponent, {
      width: '70%',
      data: {},
    });
  }

  GetOrder() {
    this.api.getOrders().subscribe({
      next: (orders) => {
        const FilterOrders = orders.filter(
          (order: any) => order.userID == localStorage.getItem('user')
        );
        this.dataSource = new MatTableDataSource(FilterOrders);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        alert(err?.error.message);
      },
    });
  }

  DeleteOrder(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'you will not be able to retrieve this Order!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.DeleteOrder(id).subscribe({
          next: (res) => {
            this.GetOrder();
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'Order successfully Deleted!',
              showConfirmButton: false,
              timer: 1300,
            });
          },
        });
      } else result.isDismissed;
    });
  }
}
