import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { generate } from 'shortid';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import Swal from 'sweetalert2';
import { firebaseService } from '../firebase.service';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.css'],
})
export class AddItemDialogComponent implements OnInit {
  ItemForm!: FormGroup;
  actionbtn: string = 'Save';
  Availability = ['In stock', 'out of stock'];
  id!: string;
  math!: number;
  categories!: any;

  constructor(
    private formbuilder: FormBuilder,
    private DialoGRef: MatDialogRef<AddItemDialogComponent>,
    private afs: AngularFirestore,
    public angularFireAuth: AngularFireAuth,
    private api: firebaseService,
    @Inject(MAT_DIALOG_DATA) public editdata: any
  ) {}

  ngOnInit(): void {
    let Uid = generate();
    this.ItemForm = this.formbuilder.group({
      categories: ['', Validators.required],
      id: [Uid],
      company: ['', Validators.required],
      availability: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['' || 0],
      tax: ['' || 0],
      description: [''],
    });
    // TO Edit the Data saved in Firebase
    if (this.editdata) {
      this.actionbtn = 'UpDate';
      this.ItemForm.controls['categories'].setValue(this.editdata.categories);
      this.ItemForm.controls['id'].setValue(this.editdata.id);
      this.ItemForm.controls['company'].setValue(this.editdata.company);
      this.ItemForm.controls['availability'].setValue(
        this.editdata.availability
      );
      this.ItemForm.controls['price'].setValue(this.editdata.price);
      this.ItemForm.controls['discount'].setValue(this.editdata.discount);
      this.ItemForm.controls['tax'].setValue(this.editdata.tax);
      this.ItemForm.controls['description'].setValue(this.editdata.description);
    }
  }
  // TO POSt the DATA in Firebase
  Additem() {
    if (!this.ItemForm.valid) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Please fill out all the Required Fields,try again.',
        showConfirmButton: false,
        timer: 1300,
      });
    } else {
      this.afs
        .collection('ITEMS')
        .doc(this.ItemForm.value.id)
        .set(this.ItemForm.value)
        .then(() => {
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Item successfully Added/UpDated!',
            showConfirmButton: false,
            timer: 1300,
          });
        })
        .catch((error) => {
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Error Adding Item!!',
            showConfirmButton: false,
            timer: 1300,
          });
        });
      this.ItemForm.reset();
      this.DialoGRef.close('Saved!');
    }
  }
  GetCategories() {
    this.api.GetCategories().subscribe({
      next: (Categ) => {
        this.categories = Categ;
      },
      error: (err) => {
        alert(err?.error.message);
      },
    });
  }
}
