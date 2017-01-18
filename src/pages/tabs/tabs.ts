import { Component } from '@angular/core';

import { TabChatsPage } from '../tab-chats/tab-chats';
import { TabContactsPage } from '../tab-contacts/tab-contacts';
import { TabProfilePage } from '../tab-profile/tab-profile';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;

  constructor() {
    this.tab1Root = TabChatsPage;
    this.tab2Root = TabContactsPage;
    this.tab3Root = TabProfilePage;
  }
}
