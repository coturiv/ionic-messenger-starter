import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactsProvider } from '../../providers/contacts/contacts';

@IonicPage()
@Component({
  selector: 'page-tab-contacts',
  templateUrl: 'tab-contacts.html',
})
export class TabContactsPage {
  contactList: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public contactsProvider: ContactsProvider) {
  }

  ionViewDidLoad() {
    this.contactsProvider.getContacts().subscribe((contacts) => {
      this.contactList = contacts;
    });
  }

}
