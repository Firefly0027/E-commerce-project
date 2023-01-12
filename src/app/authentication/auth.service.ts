import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BaseUrl: string = 'https://localhost:7207/api/User/';

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private http: HttpClient
  ) {}

  SignUp(UserObj: any) {
    return this.http.post<any>(`${this.BaseUrl}register`, UserObj);
  }

  Login(LoginObj: any) {
    return this.http.post<any>(`${this.BaseUrl}Authenticate`, LoginObj);
  }
}
