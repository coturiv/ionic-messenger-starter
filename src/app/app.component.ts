import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthProvider } from '../providers/auth/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public loadingCtrl: LoadingController,
    public authProvider: AuthProvider 
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'TabsPage' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    let loading = this.loadingCtrl.create();
    this.authProvider.getAuth()
      .map(state => !!state)
      .subscribe(authenticated => {
        loading.dismiss();
        this.rootPage = (authenticated) ? 'TabsPage' : 'LoginPage';
      }, (error) => {
        loading.dismiss();
        this.rootPage = 'LoginPage';
        console.log('Error: ' + JSON.stringify(error));
      });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.authProvider.signOut()
      .then(() => this.nav.setRoot('LoginPage'));
  }
}
