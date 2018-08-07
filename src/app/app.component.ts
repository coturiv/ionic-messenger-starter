import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appPages = [
    { title: 'Chats',      url: '/app/tabs/(tab1:chats)',      icon: 'chatbubbles' },
    { title: 'Contacts',   url: '/app/tabs/(tab2:contacts)',   icon: 'contacts' },
    { title: 'About',      url: '/app/tabs/(tab4:about)',      icon: 'information-circle' }
  ];

  currentUser: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private userService: UserService
  ) {
    this.initializeApp();

    this.currentUser = this.userService.currentUser;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  logout() {
    this.userService.logout()
      .then(_ => {
        this.navigateTo('/login');
      });
  }
}
