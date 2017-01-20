import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';


@Component({
  selector: 'page-tab-profile',
  templateUrl: 'tab-profile.html'
})
export class TabProfilePage {
  user: {displayName?: string, email?: string, photoURL?: string} = {};

  constructor(
    public authService: AuthService,
    public loadingCtrl: LoadingController
  ) {
    this.user.photoURL = 'assets/img/noimage.png';
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.authService.currentUser
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

}
