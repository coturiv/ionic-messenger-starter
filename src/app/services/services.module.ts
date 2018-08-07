import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirebaseService } from './firebase.service';
import { ChatService } from './chat.service';
import { ContactService } from './contact.service';
import { UserService } from './user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    FirebaseService,
    ChatService,
    ContactService,
    UserService
  ]
})
export class ServicesModule { }
