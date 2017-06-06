import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController, 
    public toastCtrl: ToastController,
    public authProvider: AuthProvider
  ) {
  }

  loginWithFacebook() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.authProvider.signInWithFacebook()
      .then((res) => {
        this.updateProfile(res.user || res);
        loading.dismiss();
        this.navCtrl.setRoot('TabsPage');
      }, (error) => {
        loading.dismiss();
        this.showMessage(error && error.message);
      });
  }

  /**
   * login with google
   */
  loginWithGoogle() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.authProvider.signInWithGoogle()
      .then((res) => {
        this.updateProfile(res.user || res);
        loading.dismiss();
        this.navCtrl.setRoot('TabsPage');
      }, (error) => {
        loading.dismiss();
        this.showMessage(error && error.message);
      });
  }

  /**
   * login with Github
   */
  loginWithGithub() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.authProvider.signInWithGithub()
      .then((res) => {
        this.updateProfile(res.user || res);
        loading.dismiss();
        this.navCtrl.setRoot('TabsPage');
      }, (error) => {
        loading.dismiss();
        this.showMessage(error && error.message);
      });
  }

  private updateProfile(user: any) {
    return this.authProvider.updateProfile({
      uid        : user.uid,
      displayName: user.displayName,
      email      : user.email,
      photoURL   : user.photoURL,
      providerData   : user.providerData[0]
    });
  }

  private showMessage(message: string) {
    this.toastCtrl.create({message: message, duration: 3000}).present();
  }

}
