import { Injectable } from '@angular/core';

import { FirebaseService, AFSQuery } from './firebase.service';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends FirebaseService {

  constructor(afs: AngularFirestore) {
    super(afs);
  }

  getContacts(userId: string, filter?: {startAt: any, limit: number}) {
    const query = new AFSQuery();
    if (filter) {
      query.startAt = filter.startAt;
      query.limit = filter.limit;
    }

    return this.collection(`users/${userId}/contacts`, query).pipe(
      switchMap(contacts => {
        return combineLatest(contacts.map((c: any) => this.doc(`users/${c.id}`)));
      }));
  }
}
