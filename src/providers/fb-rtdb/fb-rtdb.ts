import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the FbRtdbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FbRtdbProvider {

  constructor(public db: AngularFireDatabase) {
  }
  
  object(path: string): Observable<any> {
    return this.db.object(path).snapshotChanges().map(change => {
      return ({key: change.payload.key, ...change.payload.val()});
    });
  }

  list(path: string, query?: QueryModel): Observable<any[]> {
    return this.db.list(path, ref => query ? this.queryFn(ref, query) : ref).snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    });
  }

  push(path: string, data: any): any {
    return this.db.list(path).push(data);
  }

  set(path: string, key: string, data: any): Promise<void> {
    return this.db.list(path).set(key, data);
  }

  update(path: string, key: string, data: any): Promise<void> {
    return this.db.list(path).update(key, data);
  }

  remove(path: string, key: string): Promise<void> {
    return this.db.list(path).remove(key);
  }

  removeAll(path: string) {
    return this.db.list(path).remove();
  }

  /**
   * firebase rtdb query, should follow query combinations(https://github.com/angular/angularfire2/blob/master/docs/rtdb/querying-lists.md#creating-a-query-with-primitivescalar-values)
   */
  private queryFn(ref: firebase.database.Reference, query: QueryModel): firebase.database.Query {
    let q: any;
    if (query.orderByChild)
      q = ref.orderByChild(query.orderByChild);
    if (query.orderByKey)
      q = (q || ref).orderByKey();
    if (query.orderByValue)
      q = (q || ref).orderByValue();
    if (query.equalTo)
      q = (q || ref).equalTo(query.equalTo);
    if (query.limitToFirst)
      q = (q || ref).limitToFirst(query.limitToFirst);
    if (query.limitToLast)
      q = (q || ref).limitToFirst(query.limitToLast);
    if (query.startAt)
      q = (q || ref).startAt(query.startAt);
    if (query.endAt)
      q = (q || ref).startAt(query.endAt);

    return q || ref;
  }

}

export class QueryModel {
  orderByChild?: string;
  orderByKey?: boolean;
  orderByValue?: string;
  equalTo?: string;
  limitToFirst?: number;
  limitToLast?: number;
  startAt?: string;
  endAt?: string;
}
