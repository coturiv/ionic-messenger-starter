import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../../../services/user.service';
import { ChatService, Message, Channel } from '../../../../services/chat.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'channel-messages',
  templateUrl: './channel-messages.page.html',
  styleUrls: ['./channel-messages.page.scss'],
})
export class ChannelMessagesPage implements OnInit, OnDestroy {
  channel: Channel;
  currentUser: any;

  messages: Message[] = [];
  newMessage: Message = {};

  lastLoadedAt = null;

  channelSubscription: Subscription;
  userSubscription: Subscription;
  messagesSubscription: Subscription;
  newMessagesSubscription: Subscription;

  private autoScroller: MutationObserver;

  constructor(
    private userService: UserService, 
    private chatService: ChatService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const channelId = this.route.snapshot.paramMap.get('channelId');
    this.initMessages(channelId);

    this.userSubscription = this.userService.currentUser.pipe(take(1))
      .subscribe(user => {
        this.currentUser = user;

        this.channelSubscription = this.chatService.getChannelById(channelId).pipe(take(1))
          .subscribe(channel => {
            this.channel = channel;
            this.channel.id = channelId;

            if (channel.type == 'direct') {
              channel.memberId = Object.keys(channel.members).find(key => key != user.id);
            }
          });
      });
    
      this.autoScroller = this.autoScroll();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();

    if (this.channelSubscription) {
      this.channelSubscription.unsubscribe();
    }
      
    this.messagesSubscription.unsubscribe();

    if (this.newMessagesSubscription) {
      this.newMessagesSubscription.unsubscribe();
    }

    this.autoScroller.disconnect();
  }

  sendMessage() {
    if (!this.newMessage.text || !this.newMessage.text.trim()) {
      return true;
    }
    
    this.newMessage.channelId = this.channel.id;
    this.newMessage.from      = this.currentUser.id;
    this.newMessage.createdAt = Date.now();

    this.messages.push(this.newMessage);
    this.chatService.sendMessage(this.newMessage);

    this.chatService.lastTime.next(new Date());
    this.newMessage = this.chatService.newMessage;


    this.scrollDown();
  }

  private initMessages(channelId: string) {
    // load old messages
    this.messagesSubscription = this.chatService.getMessages(channelId).pipe(take(1))
      .subscribe(messages => {
        this.messages = messages;
        this.newMessage = this.chatService.newMessage;

        // subscribe incoming messages
        this.newMessagesSubscription = this.chatService.getMessages(channelId, true)
          .subscribe(newMessages => {
            newMessages.forEach(message => {
              if (message.createdAt) {
                const idx = this.messages.findIndex(item => item.id == message.id);
                
                if (idx >= 0) {
                  this.messages[idx] = message;
                } else {
                  this.messages.push(message);
                }
              }
              
            });
          });
        this.scrollDown();
      });
  }

  private scrollDown() {
    if (this.scroller) {
      this.scroller.scrollTop = this.scroller.scrollHeight;
    }    
  }

  private autoScroll(): MutationObserver {
    const autoScroller = new MutationObserver(this.scrollDown.bind(this));

    autoScroller.observe(this.messageContent, {
      childList: true,
      subtree: true
    });

    return autoScroller;
  }

  private get messageContent(): Element {
    return document.querySelector('.messages');
  }

  private get scroller(): Element {
    return this.messageContent.shadowRoot.querySelector('ion-scroll');
  }

}
