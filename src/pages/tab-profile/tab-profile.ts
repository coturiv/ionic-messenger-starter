import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-tab-profile',
  templateUrl: 'tab-profile.html',
})
export class TabProfilePage {
  user: {displayName?: string, email?: string, photoURL?: string} = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public authProvider: AuthProvider) {
    this.user.photoURL = 'assets/img/noavatar.png';
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.authProvider.currentUser
      .subscribe(user => {
        loading.dismiss();
        this.user.displayName  = user.displayName;
        this.user.email        = user.email || user.providerData[0].email || 'Not set yet.';
        this.user.photoURL     = user.photoURL || this.user.photoURL;
      }, (error)=> {
        loading.dismiss();
        console.log('Error: ' + JSON.stringify(error));
      });
  }

  changeProfile() {
    
  }

}
