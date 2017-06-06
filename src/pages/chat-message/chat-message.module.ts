import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatMessagePage } from './chat-message';
import { AutoSizeDirective } from '../../directives/auto-size/auto-size';

@NgModule({
  declarations: [
    ChatMessagePage,
    AutoSizeDirective
  ],
  imports: [
    IonicPageModule.forChild(ChatMessagePage),
  ],
  exports: [
    ChatMessagePage
  ]
})
export class ChatMessagePageModule {}
