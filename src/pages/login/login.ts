import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  homePage: any = TabsPage;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public authService: AuthService
  ) {}

  /**
   * login with facebook
   */
  loginWithFacebook() {
    let loading = this.loadingCtrl.create();
    loading.present();

    this.authService.signInWithFacebook().subscribe(_=> {
      loading.dismiss();
      this.navCtrl.setRoot(this.homePage);
    }, (error)=> {
      loading.dismiss();
      console.log('Error: ' + JSON.stringify(error));
    });
  }

  /**
   * login with google
   */
  loginWithGoogle() {
    let loading = this.loadingCtrl.create();
    loading.present();

    this.authService.signInWithGoogle().subscribe(_=> {
      loading.dismiss();
      this.navCtrl.setRoot(this.homePage);
    }, (error)=> {
      loading.dismiss();
      console.log('Error: ' + JSON.stringify(error));
    });
  }

  /**
   * login with Github
   */
  loginWithGithub() {
    let loading = this.loadingCtrl.create();
    loading.present();

    this.authService.signInWithGithub().subscribe(_=> {
      loading.dismiss();
      this.navCtrl.setRoot(this.homePage);
    }, (error)=> {
      loading.dismiss();
      console.log('Error: ' + JSON.stringify(error));
    });
  }
}
