import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactCardComponent } from './contact-card';

@NgModule({
  declarations: [
    ContactCardComponent,
  ],
  imports: [
    IonicPageModule.forChild(ContactCardComponent),
  ],
  exports: [
    ContactCardComponent
  ]
})
export class ContactCardComponentModule {}
