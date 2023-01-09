import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  Login() {
    if (this.email == '') {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'please enter the email',
        showConfirmButton: false,
        timer: 1300,
      });
      return;
    }
    if (this.password == '') {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'please enter the password',
        showConfirmButton: false,
        timer: 1300,
      });
      return;
    }

    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }
}
