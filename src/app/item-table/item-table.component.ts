import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';
import { firebaseService } from '../firebase.service';
import Swal from 'sweetalert2';

export interface ItemTable {
  categories: string;
  ItemID: number;
  company: string;
  availability: string;
  price: number;
  discount: number;
  tax: number;
  description: string;
}
const ITEM_DATA: ItemTable[] = [];

@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.css'],
})
export class ItemTableComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'categories',
    'company',
    'availability',
    'price',
    'discount',
    'tax',
    'description',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<ItemTable>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: firebaseService) {}

  ngOnInit(): void {
    this.getAllItem();
  }

  //Filtering
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  oPenitemDialog() {
    this.dialog
      .open(AddItemDialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Saved!') {
          this.getAllItem();
        }
      });
  }

  getAllItem() {
    this.api.GetItems().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert(err?.error.message);
      },
    });
  }

  DeleteItem(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'you will not be able to retrieve this Item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.DeleteItem(id).subscribe({
          next: (res) => {
            this.ngOnInit();
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'Item successfully Deleted!',
              showConfirmButton: false,
              timer: 1300,
            });
          },
        });
      } else result.isDismissed;
    });
  }
}
