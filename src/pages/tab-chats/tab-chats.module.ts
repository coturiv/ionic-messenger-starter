import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabChatsPage } from './tab-chats';
import { PreloadImageComponentModule } from '../../components/preload-image/preload-image.module';

@NgModule({
  declarations: [
    TabChatsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabChatsPage),
    PreloadImageComponentModule
  ],
  exports: [
    TabChatsPage
  ]
})
export class TabChatsPageModule {}
