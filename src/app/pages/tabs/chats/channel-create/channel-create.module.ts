import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChannelCreatePage } from './channel-create.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  declarations: [ChannelCreatePage],
  entryComponents: [
    ChannelCreatePage
  ]
})
export class ChannelCreatePageModule {}
