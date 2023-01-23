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

  private BaseUrl: string = 'https://localhost:7060/api/Category';
  private BaseUrlItems: string = 'https://localhost:7060/api/itemTable';
  private BaseUrlOrders: string = 'https://localhost:7060/api/OrderTable';
  private BaseUrlDetials: string = 'https://localhost:7060/api/OrderDetials';

  constructor(private afs: AngularFirestore, private http: HttpClient) {}
  //ORDER TABLE APIS
  getOrders(): Observable<any> {
    return this.http.get<any>(this.BaseUrlOrders);
  }

  AddOrders(OrderObj: any): Observable<any> {
    return this.http.post<any>(`${this.BaseUrlOrders}`, OrderObj);
  }

  DeleteOrder(id: string) {
    return this.http.delete<any>('https://localhost:7060/api/OrderTable/' + id);
  }
  //ITEM TABLE APIS
  GetItems(): Observable<any> {
    return this.http.get<any>(this.BaseUrlItems);
  }

  AddItems(ItemsObj: any): Observable<any> {
    return this.http.post<any>(`${this.BaseUrlItems}`, ItemsObj);
  }

  EditItem(id: string): Observable<any> {
    return this.http.get<any>('https://localhost:7060/api/itemTable/' + id);
  }

  UpDateItem(id: string, UpdateItemRequest: any): Observable<any> {
    return this.http.put<any>(
      'https://localhost:7060/api/itemTable/' + id,
      UpdateItemRequest
    );
  }

  DeleteItem(id: string): Observable<any> {
    return this.http.delete<any>('https://localhost:7060/api/itemTable/' + id);
  }
  // CATEGORY APIS
  GetCategories(): Observable<any> {
    return this.http.get<any>(this.BaseUrl);
  }

  AddCategories(CateogryObj: any): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}`, CateogryObj);
  }

  // OrderDetials API
  GetDetials(): Observable<any> {
    return this.http.get<any>(this.BaseUrlDetials);
  }

  FilterDetialsByID(id: string): Observable<any> {
    return this.http.get<any>('https://localhost:7060/api/OrderDetials/' + id);
  }
}
