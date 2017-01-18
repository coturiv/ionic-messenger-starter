import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ChatChannelPage } from '../chat-channel/chat-channel';


@Component({
  selector: 'page-tab-chats',
  templateUrl: 'tab-chats.html'
})
export class TabChatsPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
  }

  openChannelPage(ev: any) {
    let modal = this.modalCtrl.create(ChatChannelPage);
    modal.present();
  }

}
