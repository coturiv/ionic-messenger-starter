import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { ContactsPage } from '../pages/contacts/contacts';
import { ProfilePage } from '../pages/profile/profile';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { ChatsPage } from '../pages/chats/chats';
import { ChatsChannelPage } from '../pages/chats-channel/chats-channel';

import { AuthService } from '../providers/auth.service';
import { ChatsService } from '../providers/chats.service';

import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "FIREBASE_API_KEY",
  authDomain: "FIREBASE_AUTH_DOMAIN",
  databaseURL: "FIREBASE_DATABASE_URL",
  storageBucket: "FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "FIREBASE_MESSAGING_SENDER_ID"
};

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ContactsPage,
    ProfilePage,
    AboutPage,
    LoginPage,
    ChatsPage,
    ChatsChannelPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ContactsPage,
    ProfilePage,
    AboutPage,
    LoginPage,
    ChatsPage,
    ChatsChannelPage
  ],
  providers: [AuthService, ChatsService, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
