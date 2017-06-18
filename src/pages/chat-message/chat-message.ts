import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

import { ChatsProvider } from '../../providers/chats/chats';
import { AuthProvider, UserModel } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-chat-message',
  templateUrl: 'chat-message.html',
})
export class ChatMessagePage implements OnInit, OnDestroy {
  chatText: string;
  chatMessages: Array<string>;
  textMaxLength: number = 400;
  user: UserModel;

  private autoScroller: MutationObserver;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public keyboard: Keyboard,
    public chatProvider: ChatsProvider,
    public authProvider: AuthProvider
  ) {
    this.user = navParams.get('user');
  }

  ionViewDidLoad() {
    this.chatProvider.getMessages()
      .subscribe((messages => this.chatMessages = messages));

    if (this.platform.is('cordova')) {
      this.keyboard.onKeyboardShow()
        .subscribe(() => this.scrollDown());
    }
  }

  ngOnInit() {
    this.autoScroller = this.autoScroll();
  }

  ngOnDestroy() {
    this.autoScroller.disconnect();
  }

  sendMessage(event: any) {
    if (!this.chatText)
      return;

    this.chatProvider.sendMessage((this.user as any).$key, this.chatText)
      .then(() => {
          this.chatText = '';
          this.scrollDown();
      }, (error) => {
          console.log(error);
      });
  }

  isToday(timestamp: number) {
    return new Date(timestamp).setHours(0,0,0,0) == new Date().setHours(0,0,0,0);
  }

  private scrollDown() {
      this.scroller.scrollTop = this.scroller.scrollHeight;
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
      return this.messageContent.querySelector('.scroll-content');
  }

}
