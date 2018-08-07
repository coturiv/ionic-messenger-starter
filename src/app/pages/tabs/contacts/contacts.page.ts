import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Content } from '@ionic/angular';

import { UserService } from '../../../services/user.service';
import { ChatService } from '../../../services/chat.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit, OnDestroy {
  contacts = [];
  lastLoadedAt = null;

  filteredList = [];
  searchText = '';

  currentUser: any;

  dataSubscription: Subscription;
  userSubscription: Subscription;

  @ViewChild(Content) content: Content;

  constructor(private userService: UserService, private chatService: ChatService, private router: Router) { }

  ngOnInit() {
    this.loadData();

    this.userSubscription = this.userService.currentUser
      .subscribe(user => {
        this.currentUser = user;
      });
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }

    this.userSubscription.unsubscribe();
  }

  loadData(event?) {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }

    this.dataSubscription = this.userService.getUsers({startAfter: this.lastLoadedAt, limit: 20})
      .subscribe(users => {
        this.contacts = this.contacts.concat(users);
        this.search();
        
        this.lastLoadedAt = (users.slice(-1)[0] as any).createdAt;

        if (event) {
          event.target.complete();
        }
    });
  }

  search() {
    const text = this.searchText.toLowerCase().trim();
    this.filteredList = this.contacts.filter(c => {
      const fc = Object.assign({}, c);
      delete fc.createdAt;            //ignore createdAt

      return JSON.stringify(fc).toLowerCase().indexOf(text) > -1;
    });
  }

  createDirectChannel(contact: any) {
    this.chatService.createDirectChannel(this.currentUser, contact)
      .then(channelId => {
        this.router.navigateByUrl(`/app/tabs/(tab1:chats/${channelId})`);
      });
  }

}
