import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { CategoriesDialogComponent } from '../categories-dialog/categories-dialog.component';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}
  Signout() {
    this.auth.signout;
  }
  OpenDialog() {
    this.dialog.open(CategoriesDialogComponent, {
      width: '20%',
    });
  }
}
