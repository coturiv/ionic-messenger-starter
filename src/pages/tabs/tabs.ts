import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
@IonicPage()
export class TabsPage {

  tab1Root = 'TabChatsPage'
  tab2Root = 'TabContactsPage'
  tab3Root = 'TabProfilePage'


  constructor(public navCtrl: NavController) {}

}
