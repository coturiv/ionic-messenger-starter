import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { AuthProvider } from '../auth/auth';

import { tableNames } from '../../app/app.constants';

@Injectable()
export class ChatsProvider {

  constructor(public db: AngularFireDatabase, public authProvider: AuthProvider) {
  }

  getMessages(channelId: string = 'general') {

    return this.db.list(`${tableNames.ChatMessage}/${channelId}`)
      .map(messages => messages.map((item) => {
        item.day = new Date(item.timestamp || Date.now()).getDate();

        if (item.from)
          item.user = this.authProvider.getFullProfile(item.from);

          return item;
      }));
  }

  getLastMessages(channelId: string = 'general', count: number = 5) {
    return this.db.list(`${tableNames.ChatMessage}/${channelId}`, {query: {
      limitToLast: 5,
      orderByPriority: true
    }}).map(messages => messages.reverse().map((item) => {
        if (item.from)
          item.user = this.authProvider.getFullProfile(item.from);

          return item;
      }));
  }

  sendMessage(userId: string, message: string, channelId: string = 'general') {
    return this.db.list(`${tableNames.ChatMessage}/${channelId}`)
      .push({
        from: userId,
        message: message,
        timestamp: firebase.database['ServerValue']['TIMESTAMP']
      });
  }

}

export class MessageModel {
  channelId?: string;             // channelId
  from?: string;                  // userId
  messsage?: string;              // message body(text)
  image?: string | any;           // message body(image)
  timestamp?: string | Object     // firebase timestamp
}

export class ChannelModel {
  name?: string;                   // channel name
  icon?: string;                   // channel icon
  members?: any;                   // member list
  lastMessage?: string;            // last message id
  timestamp?: string | Object;     // created / upadated time
}
