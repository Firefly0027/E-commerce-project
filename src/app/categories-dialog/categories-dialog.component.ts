import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { firebaseService } from '../firebase.service';

@Component({
  selector: 'app-categories-dialog',
  templateUrl: './categories-dialog.component.html',
  styleUrls: ['./categories-dialog.component.css'],
})
export class CategoriesDialogComponent implements OnInit {
  CategForm!: FormGroup;

  constructor(
    private Service: firebaseService,
    private formbuilder: FormBuilder,
    private DialoGRef: MatDialogRef<CategoriesDialogComponent>
  ) {}

  ngOnInit(): void {
    this.CategForm = this.formbuilder.group({
      categoryName: ['', Validators.required],
    });
  }

  AddCategorie() {
    if (!this.CategForm.valid) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Please fill out all the Required Fields,try again.',
        showConfirmButton: false,
        timer: 1300,
      });
    } else {
      this.Service.AddCategories(this.CategForm.value).subscribe({
        next: (res) => {
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Categorie successfully Added!',
            showConfirmButton: false,
            timer: 1300,
          });
        },
        error: () => {
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Error Adding Categorie!!',
            showConfirmButton: false,
            timer: 1300,
          });
        },
      });

      this.CategForm.reset();
      this.DialoGRef.close('Saved!');
    }
  }
}
