import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { ChatsPageModule } from './chats/chats.module';
import { ContactsPageModule } from './contacts/contacts.module';
import { ProfilePageModule } from './profile/profile.module';
import { AboutPageModule } from './about/about.module';

import { ChatsPage } from './chats/chats.page';
import { ContactsPage } from './contacts/contacts.page';
import { ProfilePage } from './profile/profile.page';
import { AboutPage } from './about/about.page';
import { ChannelMessagesPage } from './chats/channel-messages/channel-messages.page';
import { ChannelMessagesPageModule } from './chats/channel-messages/channel-messages.module';

const routes: Routes = [
  {
   path: 'tabs',
   component: TabsPage,
   children: [{
     path: 'chats',
     outlet: 'tab1',
     component: ChatsPage
   }, {
     path: 'chats/:channelId',
     outlet: 'tab1',
     component: ChannelMessagesPage
   }, {
     path: 'contacts',
     outlet: 'tab2',
     component: ContactsPage
   }, {
     path: 'profile',
     outlet: 'tab3',
     component: ProfilePage
   }, {
     path: 'about',
     outlet: 'tab4',
     component: AboutPage
   }]
 }, {
   path: '',
   redirectTo: '/app/tabs/(tab1:chats)'
 }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),

    ChatsPageModule,
    ContactsPageModule,
    ProfilePageModule,
    AboutPageModule,
    ChannelMessagesPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
