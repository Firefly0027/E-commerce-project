import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/compat/database';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class firebaseService {
  sort: any;

  private BaseUrl: string = 'https://localhost:7071/api/Category';
  private BaseUrlItems: string = 'https://localhost:7071/api/ItemTable';

  constructor(private afs: AngularFirestore, private http: HttpClient) {}

  getOrders() {
    return this.afs
      .collection<any>('Orders', (ref) =>
        ref.where('userID', '==', localStorage.getItem('UserID'))
      )
      .valueChanges();
  }

  GetItems(): Observable<any> {
    return this.http.get<any>(this.BaseUrlItems);
  }

  AddItems(ItemsObj: any): Observable<any> {
    return this.http.post<any>(`${this.BaseUrlItems}`, ItemsObj);
  }

  EditItem(id: string): Observable<any> {
    return this.http.get<any>('https://localhost:7071/api/ItemTable/' + id);
  }

  UpDateItem(id: string, UpdateItemRequest: any): Observable<any> {
    return this.http.put<any>(
      'https://localhost:7071/api/ItemTable/' + id,
      UpdateItemRequest
    );
  }

  DeleteItem(id: string): Observable<any> {
    return this.http.delete<any>('https://localhost:7071/api/ItemTable/' + id);
  }

  GetCategories(): Observable<any> {
    return this.http.get<any>(this.BaseUrl);
  }

  AddCategories(CateogryObj: any): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}`, CateogryObj);
  }
}
