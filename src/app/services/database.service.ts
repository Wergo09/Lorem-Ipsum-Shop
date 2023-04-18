import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: AngularFirestore) {}

  getCategories(): Observable<any[]> {
    return this.db.collection('categories').valueChanges({idField: 'id'});
  }

  getCategory(id: string): Observable<any> {
    return this.db.collection('categories').doc(id).valueChanges({idField: 'id'})
  }

  getProducts(): Observable<any[]> {
    return this.db.collection('products').valueChanges({idField: 'id'});
  }
}