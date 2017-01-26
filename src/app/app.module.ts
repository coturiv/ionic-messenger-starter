import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { TabContactsPage } from '../pages/tab-contacts/tab-contacts';
import { TabProfilePage } from '../pages/tab-profile/tab-profile';
import { TabChatsPage } from '../pages/tab-chats/tab-chats';
import { ChatChannelPage } from '../pages/chat-channel/chat-channel';
import { ChatMessagePage } from '../pages/chat-message/chat-message';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';

import { AuthService } from '../providers/auth.service';
import { ChatsService } from '../providers/chats.service';

import { AngularFireModule } from 'angularfire2';

// export const firebaseConfig = {
//   apiKey: "FIREBASE_API_KEY",
//   authDomain: "FIREBASE_AUTH_DOMAIN",
//   databaseURL: "FIREBASE_DATABASE_URL",
//   storageBucket: "FIREBASE_STORAGE_BUCKET",
//   messagingSenderId: "FIREBASE_MESSAGING_SENDER_ID"
// };

export const firebaseConfig = {
  apiKey: "AIzaSyCuBEWIhIIEoQyn8g2i34Gy4iWyPBF1dr0",
  authDomain: "ionic-messenger-starter.firebaseapp.com",
  databaseURL: "https://ionic-messenger-starter.firebaseio.com",
  storageBucket: "ionic-messenger-starter.appspot.com",
  messagingSenderId: "285970246877"
};

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    TabContactsPage,
    TabProfilePage,
    TabChatsPage,
    ChatChannelPage,
    ChatMessagePage,
    LoginPage,
    AboutPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    TabContactsPage,
    TabProfilePage,
    TabChatsPage,
    ChatChannelPage,
    ChatMessagePage,
    LoginPage,
    AboutPage
  ],
  providers: [AuthService, ChatsService, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
