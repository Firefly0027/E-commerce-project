import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-order-detials-dialog',
  templateUrl: './order-detials-dialog.component.html',
  styleUrls: ['./order-detials-dialog.component.css'],
})
export class OrderDetialsDialogComponent implements OnInit {
  constructor(
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
  dataSource = new MatTableDataSource(this.data.Details);
  tableFooterColumns: string[] = ['total'];

  ngOnInit(): void {}

  getTotalprice() {
    return this.data.Details.map((t: { price: any }) =>
      parseInt(t.price)
    ).reduce((acc: any, value: any) => acc + value);
  }

  getTotalQuantity() {
    return this.data.Details.map((t: { quantity: any }) =>
      parseInt(t.quantity)
    ).reduce((acc: any, value: any) => acc + value);
  }

  getTotalDiscount() {
    return this.data.Details.map(
      (t: { grosstotal: number; discount: number }) =>
        (t.discount / 100) * t.grosstotal
    ).reduce((acc: any, value: any) => acc + value);
  }

  getTotalTax() {
    return this.data.Details.map(
      (t: { grosstotal: number; tax: number }) => (t.tax / 100) * t.grosstotal
    ).reduce((acc: any, value: any) => acc + value);
  }
  GetTotalProducts() {
    return this.data.Details.map((t: { total: any }) =>
      parseInt(t.total)
    ).reduce((acc: any, value: any) => acc + value);
  }
  GetTotalGross() {
    return this.data.Details.map((t: { grosstotal: any }) =>
      parseInt(t.grosstotal)
    ).reduce((acc: any, value: any) => acc + value);
  }
}
