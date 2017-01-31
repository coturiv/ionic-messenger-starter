import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import { AuthService, AuthMode } from '../../providers/auth.service';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  homePage: any = TabsPage;

  constructor(
    public navCtrl    : NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl  : ToastController,
    public authService: AuthService,
  ) {}

  /**
   * login with facebook
   */
  loginWithFacebook() {
    this.login(AuthMode.Facebook)
  }

  /**
   * login with google
   */
  loginWithGoogle() {
    this.login(AuthMode.GooglePlus);
  }

  /**
   * login with Github
   */
  loginWithGithub() {
    this.login(AuthMode.Github);
  }

  private login(mode: AuthMode) {
    let loading = this.loadingCtrl.create();
    loading.present();

    this.authService.login(mode)
      .then((data) => {
        this.authService.getFullProfile(data.uid)
          .first()
          .subscribe((user) => {
            if (user.$value == null) {
              this.authService.createAccount(data.auth)
                .then( _=> {
                  loading.dismiss();
                  this.navCtrl.setRoot(TabsPage);
                }, (error)=> this.showMessage(error.message || 'Unknown error'));
            } else {
              loading.dismiss();
              this.navCtrl.setRoot(TabsPage);
            }
          }, (error)=> {
            loading.dismiss();
            this.showMessage(error.message || 'Unknown error');
          });
      }, (error)=>{
        loading.dismiss();
        this.showMessage(error.message || 'Unknown error');
    });
  }

  private showMessage(message: string) {
    this.toastCtrl.create({message: message, duration: 3000}).present();
  }
}
