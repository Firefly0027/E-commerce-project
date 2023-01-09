import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  //login Method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      () => {
        localStorage.setItem('AIzaSyDKFxr-MMQP5_t9wfQppVVNuCNW_S-2HIs', 'true');
        this.router.navigate(['./order-Table']);
        this.fireauth.currentUser.then((data) => {
          localStorage.setItem('UserID', data?.uid || '');
          const UID = data?.uid;
        });
      },
      (err) => {
        Swal.fire(err.message);
        this.router.navigate(['./login']);
      }
    );
  }
  //register method
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      () => {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'registeration is successful',
          showConfirmButton: false,
          timer: 1300,
        });
        this.router.navigate(['./login']);
      },
      (err) => {
        Swal.fire(err.message);
        this.router.navigate(['./register']);
      }
    );
  }
  //signout method
  signout() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('AIzaSyDKFxr-MMQP5_t9wfQppVVNuCNW_S-2HIs');
        this.router.navigate(['./login']);
      },
      (err) => {
        Swal.fire(err.message);
      }
    );
  }
}
