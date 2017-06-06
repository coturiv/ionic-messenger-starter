import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { tableNames } from '../../app/app.constants';


@Injectable()
export class ContactsProvider {

  constructor(public db: AngularFireDatabase) {
  }

  getContacts() {
    return this.db.list(tableNames.User, {query: {
      orderByChild: 'updatedAt'
    }}).map((contacts) => contacts.reverse());
  }

}
