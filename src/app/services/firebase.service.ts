import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase/app';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()
export class FirebaseService {

  constructor(
    protected afs: AngularFirestore, 
    private storage?: AngularFireStorage
  ) {
  }
  
  protected doc<T>(path: string): Observable<T> {
    return this.afs.doc<T>(`${path}`).snapshotChanges().pipe(
      map(change => {
        return Object.assign({}, change.payload.data(), {id: change.payload.id});
      }));
  }

  protected collection<T>(path: string, query?: AFSQuery): Observable<T[]> {
    return this.afs.collection<T>(`${path}`, ref => query ? query.exec(ref) : ref).snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => Object.assign({}, c.payload.doc.data(), {id: c.payload.doc.id}));
    }));
  }

  protected add(path: string, data: any) {
    const id = this.generatedId;
    return this.afs.doc(`${path}/${id}`).set({id, ...data});
  }

  protected set(path: string, id: string, data: any, merge: boolean = false) {
    return this.afs.doc(`${path}/${id}`).set(data, {merge: merge});
  }

  protected update(path: string, id: string, data: any) {
    return this.afs.doc(`${path}/${id}`).update(data);
  }

  protected delete(path: string, id: string) {
    return this.afs.doc(`${path}/${id}`).delete();
  }

  protected async deleteCol(path: string) {
    const batch = this.afs.firestore.batch();
    const qs = await this.afs.collection(path).ref.get();
    qs.forEach(doc => batch.delete(doc.ref));
    return batch.commit();
  }

  protected get generatedId() {
    return this.afs.createId();
  }

  protected get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  protected get batch() {
    return this.afs.firestore.batch();
  }
  
  uploadFile(file: any, fileName: string, path: string = 'images') {
    return this.storage.upload(`${path}/${fileName}`, file);
  }

}

export class AFSQuery {
  where?: Array<[string | firebase.firestore.FieldPath, firebase.firestore.WhereFilterOp, any]>;
  orderBy?: [string | firebase.firestore.FieldPath, firebase.firestore.OrderByDirection];
  limit?: number;
  startAt?: string;
  startAfter?: string;
  endAt?: string;
  endBefore?: string;

  exec(ref: firebase.firestore.CollectionReference) {
    let query: any = ref;

    if (this.where) {
      for (let w of this.where) {
        query = query.where(w[0], w[1], w[2]);
      }
    }

    if (this.orderBy)
      query = query.orderBy(this.orderBy[0], this.orderBy[1]);

    if (this.limit)
      query = query.limit(this.limit);

    if (this.startAt)
      query = query.startAt(this.startAt);

    if (this.startAfter)
      query = query.startAfter(this.startAfter);

    if (this.endAt)
      query = query.endAt(this.endAt);

    if (this.endBefore)
      query = query.endBefore(this.endBefore);
    
    return query;
  }
}
