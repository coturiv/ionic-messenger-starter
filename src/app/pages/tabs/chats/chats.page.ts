import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { UserService } from '../../../services/user.service';
import { ChatService, Channel } from '../../../services/chat.service';
import { ChannelCreatePage } from './channel-create/channel-create.page';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit, OnDestroy {
  channels: any;
  directs: any;

  currentUser: any;
  userSubscription: Subscription

  constructor(private userService: UserService, private chatService: ChatService, private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
    this.userSubscription = this.userService.currentUser
      .subscribe(user => {
        this.currentUser = user;
        if (user) {
          this.channels = this.chatService.getChannels(user);
          this.directs = this.chatService.getDirects(user).pipe(
            map(channels => channels.map((c: any) => {
              c.memberId = Object.keys(c.members).find(key => key != user.id);
              return c;
            }))
          );
        }
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async createChannel() {
    const modal = await this.modalCtrl.create({
      component: ChannelCreatePage
    });

    modal.onDidDismiss(res => {
      const newChannel = res.data;
      if (newChannel) {
        newChannel.owner = this.currentUser.id;

        const members = {};
        newChannel.members.forEach(memberId => {
          members[memberId] = true;
        });
        members[newChannel.owner] = true;

        newChannel.members = members;     // convert to nested object for firestore filtering.
        newChannel.type    = 'private';   // for better performance, no one allowed to create public channel on this repo.

        this.chatService.createChannel(newChannel)
          .then(channelId => {
            this.navigateTo(`/app/tabs/(tab1:chats/${channelId})`);
          });
      }
    });

    modal.present();
  }

  leaveChannel(channel: Channel) {
    channel[`members.${this.currentUser.id}`] = false;
    this.chatService.updateChannel(channel.id, channel);
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

}
