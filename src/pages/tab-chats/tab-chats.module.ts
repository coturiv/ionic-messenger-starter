import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabChatsPage } from './tab-chats';

@NgModule({
  declarations: [
    TabChatsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabChatsPage),
  ],
  exports: [
    TabChatsPage
  ]
})
export class TabChatsPageModule {}
