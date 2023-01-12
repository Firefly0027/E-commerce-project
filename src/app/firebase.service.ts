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

  private BaseUrl: string = 'https://localhost:7207/api/Category';

  constructor(private afs: AngularFirestore, private http: HttpClient) {}

  getOrders() {
    return this.afs
      .collection<any>('Orders', (ref) =>
        ref.where('userID', '==', localStorage.getItem('UserID'))
      )
      .valueChanges();
  }

  GetItems() {
    return this.afs.collection<any>('ITEMS').valueChanges();
  }

  GetCategories(): Observable<any> {
    return this.http.get<any>(this.BaseUrl);
  }

  AddCategories(CateogryObj: any): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}`, CateogryObj);
  }
}
