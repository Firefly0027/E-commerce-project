import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class firebaseService {
  sort: any;

  private BaseUrl: string = 'https://localhost:7060/api/';

  constructor(private afs: AngularFirestore, private http: HttpClient) {}
  //ORDER TABLE APIS
  getOrders(): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}OrderT`);
  }

  AddOrders(OrderObj: any): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}OrderT`, OrderObj);
  }

  DeleteOrder(id: string) {
    return this.http.delete<any>(`${this.BaseUrl}OrderT/` + id);
  }
  //ITEM TABLE APIS
  GetItems(): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}ItemT`);
  }

  AddItems(ItemsObj: any): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}ItemT`, ItemsObj);
  }

  EditItem(id: string): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}ItemT/` + id);
  }

  UpDateItem(id: string, UpdateItemRequest: any): Observable<any> {
    return this.http.put<any>(`${this.BaseUrl}ItemT/` + id, UpdateItemRequest);
  }

  DeleteItem(id: string): Observable<any> {
    return this.http.delete<any>(`${this.BaseUrl}ItemT/` + id);
  }
  // CATEGORY APIS
  GetCategories(): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}Category`);
  }

  AddCategories(CateogryObj: any): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}Category`, CateogryObj);
  }

  // OrderDetials API
  GetDetials(): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}OrderDetials`);
  }

  FilterDetialsByID(id: string): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}OrderDetials/` + id);
  }
}
