import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { firebaseService } from '../firebase.service';

export interface MATHTABLE {
  orderID: number;
  itemID: number;
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
  selector: 'app-order-detials-dialog',
  templateUrl: './order-detials-dialog.component.html',
  styleUrls: ['./order-detials-dialog.component.css'],
})
export class OrderDetialsDialogComponent implements OnInit {
  constructor(
    private api: firebaseService,
    public dialogRef: MatDialogRef<OrderDetialsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  displayedColumns: string[] = [
    'itemName',
    'price',
    'quantity',
    'grosstotal',
    'discount',
    'tax',
    'total',
  ];
  dataSource = new MatTableDataSource(MATHTABLE_DATA);
  tableFooterColumns: string[] = ['total'];

  GetDeitals() {
    this.api.GetDetials().subscribe({
      next: (detials) => {
        const FilterByOrder = detials;
        const Filter = FilterByOrder.filter(
          (order: any) => order.orderID == this.data.OrderID
        );
        this.dataSource = new MatTableDataSource(Filter);
      },
    });
  }

  ngOnInit(): void {
    this.GetDeitals();
  }
}
