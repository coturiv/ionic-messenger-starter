import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatChannelPage } from './chat-channel';

@NgModule({
  declarations: [
    ChatChannelPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatChannelPage),
  ],
  exports: [
    ChatChannelPage
  ]
})
export class ChatChannelPageModule {}
