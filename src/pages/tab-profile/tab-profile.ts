import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-tab-profile',
  templateUrl: 'tab-profile.html'
})
export class TabProfilePage {
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = {
      email: 'sdey0081@gmail.com',
      photoUrl: 'assets/img/noimage.png',
      displayName: 'Benny Chan'
    }
  }

  ionViewDidLoad() {}

}
