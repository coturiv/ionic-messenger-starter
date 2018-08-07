import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChannelMessagesPage } from './channel-messages.page';
import { PipesModule } from '../../../../pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    outlet: 'tab1',
    component: ChannelMessagesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule
  ],
  declarations: [ChannelMessagesPage]
})
export class ChannelMessagesPageModule {}
