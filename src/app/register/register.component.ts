import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authh: AuthService) {}

  ngOnInit(): void {}
  Register() {
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

    this.authh.register(this.email, this.password);
    this.email = '';
    this.password = '';
  }
}
