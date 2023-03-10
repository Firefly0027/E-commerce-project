import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BaseUrl: string = 'https://localhost:7060/api/UsersControllers/';

  constructor(private http: HttpClient) {}

  SignUp(UserObj: any) {
    return this.http.post<any>(`${this.BaseUrl}Register`, UserObj);
  }

  Login(LoginObj: any) {
    return this.http.post<any>(`${this.BaseUrl}Login`, LoginObj);
  }
}
