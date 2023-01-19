import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private auth: AuthService,
    private formbuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  Login() {
    if (this.loginForm.valid) {
      this.auth.Login(this.loginForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('user', JSON.stringify(res.id));
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: res.message,
            showConfirmButton: false,
            timer: 1300,
          });
          this.router.navigate(['./order-Table']);
        },
        error: (err) => {
          Swal.fire(err?.error.message);
        },
      });
    } else {
      if (this.loginForm.value.Email == '') {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'please enter the email',
          showConfirmButton: false,
          timer: 1300,
        });
        return;
      }
      if (this.loginForm.value.Password == '') {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'please enter the password',
          showConfirmButton: false,
          timer: 1300,
        });
        return;
      }
    }
  }
}
