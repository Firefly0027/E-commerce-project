import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firebaseService } from '../firebase.service';

@Component({
  selector: 'app-edit-item-dialog',
  templateUrl: './edit-item-dialog.component.html',
  styleUrls: ['./edit-item-dialog.component.css'],
})
export class EditItemDialogComponent implements OnInit {
  itemsDetials: any = {
    itemID: '',
    categoryID: '',
    company: '',
    availability: '',
    price: 0,
    discount: 0,
    tax: 0,
    description: '',
  };
  actionbtn: string = 'Save';
  Availability = ['In stock', 'out of stock'];
  categories!: any;

  constructor(
    private api: firebaseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.api.EditItem(id).subscribe({
            next: (res) => {
              this.itemsDetials = res;
            },
          });
        }
      },
    });
  }

  upDateItem() {
    this.api.UpDateItem(this.itemsDetials.itemID, this.itemsDetials).subscribe({
      next: (res) => {
        this.router.navigate(['/Item-Table']);
      },
    });
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
