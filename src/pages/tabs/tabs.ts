import { Component } from '@angular/core';

import { ChatsPage } from '../chats/chats';
import { ContactsPage } from '../contacts/contacts';
import { ProfilePage } from '../profile/profile';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;

  constructor() {
    this.tab1Root = ChatsPage;
    this.tab2Root = ContactsPage;
    this.tab3Root = ProfilePage;
  }
}
