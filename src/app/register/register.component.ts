import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  SignUpForm!: FormGroup;

  constructor(
    private authh: AuthService,
    private formbuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.SignUpForm = this.formbuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      UserName: ['', Validators.required],
    });
  }
  Register() {
    if (this.SignUpForm.valid) {
      console.log(this.SignUpForm.value);
      this.authh.SignUp(this.SignUpForm.value).subscribe({
        next: (res) => {
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: res.message,
            showConfirmButton: false,
            timer: 1300,
          });
          this.router.navigate(['./login']);
        },
        error: (err) => {
          Swal.fire(err?.error.message);
          this.router.navigate(['./register']);
        },
      });
    } else {
      if (this.SignUpForm.value.Email == '') {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'please enter the email',
          showConfirmButton: false,
          timer: 1300,
        });
        return;
      }
      if (this.SignUpForm.value.Password == '') {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'please enter the password',
          showConfirmButton: false,
          timer: 1300,
        });
        return;
      }
      if (this.SignUpForm.value.UserName == '') {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'please enter the UserName',
          showConfirmButton: false,
          timer: 1300,
        });
        return;
      }
    }
  }
}
