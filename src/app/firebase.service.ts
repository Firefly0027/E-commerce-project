import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/compat/database';

@Injectable({
  providedIn: 'root',
})
export class firebaseService {
  sort: any;
  constructor(private afs: AngularFirestore) {}

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

  GetCategories() {
    return this.afs.collection<any>('Categories').valueChanges();
  }
}
