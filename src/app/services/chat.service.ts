import { Injectable } from '@angular/core';
import { FirebaseService, AFSQuery } from './firebase.service';
import { AngularFirestore } from 'angularfire2/firestore';

import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';
import { resolve } from '../../../node_modules/@types/q';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends FirebaseService {
  lastTime = new BehaviorSubject(new Date());

  constructor(afs: AngularFirestore) {
    super(afs);
  }

  get newMessage() {
    const message: Message = {};
    message.id = this.generatedId;
    message.text = '';

    return message;
  }
  
  getMessages(channelId: string, isNewOnly = false) {
    const query = new AFSQuery();
    query.orderBy = ['createdAt', 'asc'];
    query.limit = 50;

    if (!isNewOnly) {
      return this.getMessagesByChannel(channelId, query);
    }

    return this.lastTime.pipe(
      switchMap(datetime => {
        query.where = [
          [ 'createdAt', '>', datetime ]
        ];
        return this.getMessagesByChannel(channelId, query);
    }));
  }

  private getMessagesByChannel(channelId: string, query: AFSQuery) {
    return this.collection<Message>(`chats/${channelId}/messages`, query);
  }

  sendMessage(message: Message) {
    const timestamp = this.timestamp;

    return Promise.all([
      this.set(`chats/${message.channelId}/messages`, message.id, {
        from     : message.from,
        text     : message.text,
        createdAt: timestamp
      }),
      this.updateChannel(message.channelId, {
        lastMessage: message.text,
        updatedAt  : timestamp
      })
    ]);
  }

  getChannels(user: any) {
    return combineLatest(this.getPublics(), this.getPrivates(user)).pipe(
      map(arr => arr.reduce((acc, cur) => acc.concat(cur) ) ),
    );
  }

  private getPublics() {
    const query = new AFSQuery();
    query.where = [
      ['type', '==', 'public']
    ];

    return this.collection<Channel>('chats', query);
  }

  private getPrivates(user: any) {
    const query = new AFSQuery();
    query.where = [
      ['type', '==', 'private'],
      [`members.${user.id}`, '==', true]
    ];

    return this.collection<Channel>('chats', query);
  }

  getDirects(user: any) {
    const query = new AFSQuery();
    query.where = [
      ['type', '==', 'direct'],
      [`members.${user.id}`, '==', true]
    ];

    return this.collection<Channel>('chats', query);
  }

  getChannelById(channelId: string) {
    return this.doc<Channel>(`chats/${channelId}`);
  }

  createChannel(channel: Channel) {
    channel.id = this.generatedId;

    const timestamp = this.timestamp;
    channel.createdAt = timestamp;
    channel.updatedAt = timestamp;

    return this.set('chats', channel.id, channel as any)
      .then(_ => Promise.resolve(channel.id));
  }

  createDirectChannel(owner: any, user: any) {
    const query = new AFSQuery();
    query.where = [
      [`members.${owner.id}`, '==', true],
      [`members.${user.id}`, '==', true]
    ];

    return new Promise((resolve) => {
      this.collection<Channel>('chats', query).pipe(take(1))
        .subscribe(channels => {
          if (channels.length) {
            resolve(channels[0].id);
          } else {
            const members = {};
            members[owner.id] = true;
            members[user.id] = true;

            const newId = this.generatedId;
            const timestamp = this.timestamp;

            this.set('chats', newId, {
              id: newId,
              type: 'direct',
              members: members,
              owner: owner.id,
              purpose: `created by ${owner.displayName}`,
              createdAt: timestamp,
              updatedAt: timestamp
            }).then(_ => resolve(newId));
          }
        });
    })
  }

  updateChannel(channelId: string, data: any) {
    this.update('chats', channelId, data);
  }
}

export interface Message {
  id         ?: string;
  from       ?: string;
  text       ?: string;
  lastMessage?: Message | any;
  isEdited   ?: boolean;
  createdAt  ?: string | any;
  updatedAt  ?: string | any;
  channelId  ?: string;
  status     ?: string;   // 'pending' | 'sent'
}

export interface Channel {
  id?: string;
  name?: string;
  members?: any;
  memberId?: string;  // 'memberId' in direct channel
  type?: string;      //'public' | 'private' | 'direct'
  owner?: string;
  photoURL?: string;
  createdAt?: any;
  updatedAt?: any;
}
