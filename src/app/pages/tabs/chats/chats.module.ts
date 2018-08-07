import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChatsPage } from './chats.page';
import { PipesModule } from '../../../pipes/pipes.module';
import { ChannelCreatePageModule } from './channel-create/channel-create.module';

const routes: Routes = [
  {
    path: '',
    outlet: 'tab1',
    component: ChatsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,

    ChannelCreatePageModule
  ],
  declarations: [ChatsPage]
})
export class ChatsPageModule {}
