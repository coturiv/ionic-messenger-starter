import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the FbFirestoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FbFirestoreProvider {

  constructor(public afs: AngularFirestore) {
  }
  
  object(path: string): Observable<any> {
    return this.afs.doc(path).snapshotChanges().map(change => {
      return ({id: change.payload.id, ...change.payload.data()});
    });
  }

  list(path: string, query?: AFSQueryModel): Observable<any[]> {
    return this.afs.collection(path, ref => query ? this.queryFn(ref, query) : ref).snapshotChanges().map(changes => {
      return changes.map(c => ({id: c.payload.doc.id, ...c.payload.doc.data()}));
    });
  }

  push(path: string, data: any): any {
    return this.afs.collection(path).add(data);
  }

  set(path: string, id: string, data: any): Promise<void> {
    return this.afs.doc(`${path}/${id}`).set(data);
  }

  update(path: string, id: string, data: any): Promise<void> {
    return this.afs.doc(`${path}/${id}`).update(data);
  }

  remove(path: string, id: string): Promise<void> {
    return this.afs.doc(`${path}/${id}`).delete();
  }

  /**
   * firebase firestore query, should follow query combinations(https://github.com/angular/angularfire2/blob/master/docs/firestore/querying-collections.md)
   */
  private queryFn(ref: any, query: AFSQueryModel): any {
    let q: any;
    if (query.where)
      q = ref.where(query.where.field, query.where.opt, query.where.value);
    if (query.orderBy)
      q = (q || ref).orderBy(query.orderBy);
    if (query.limit)
      q = (q || ref).limit(query.limit);
    if (query.startAt)
      q = (q || ref).startAt(query.startAt);
    if (query.startAfter)
      q = (q || ref).startAfter(query.startAfter);
    if (query.endAt)
      q = (q || ref).endAt(query.endAt);
    if (query.endBefore)
      q = (q || ref).endBefore(query.endBefore);

    return q || ref;
  }

}

export class AFSQueryModel {
  where?: {field: string, opt: string, value: any};
  orderBy?: string;
  limit?: number;
  startAt?: string;
  startAfter?: string;
  endAt?: string;
  endBefore?: string;
}
