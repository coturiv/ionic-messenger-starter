import { Injectable } from '@angular/core';
import { FbRtdbProvider, QueryModel } from '../fb-rtdb/fb-rtdb';
import { tableNames } from '../../app/app.constants';


@Injectable()
export class ContactsProvider {

  constructor(public rtdb: FbRtdbProvider) {
  }

  getContacts() {
    let query = new QueryModel();
    query.orderByChild = 'updatedAt';

    return this.rtdb.list(tableNames.User, query).map((contacts) => contacts.reverse());
  }

}
