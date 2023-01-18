import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditItemDialogComponent } from './edit-item-dialog/edit-item-dialog.component';
import { HomeComponent } from './Home/Home.component';
import { ItemTableComponent } from './item-table/item-table.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'order-Table', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'Item-Table', component: ItemTableComponent },
  { path: 'Item-Table/edit/:id', component: EditItemDialogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
