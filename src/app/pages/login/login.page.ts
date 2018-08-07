import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';

import { UserService } from '../../services/user.service';

import * as firebase from 'firebase/app';

@Component({
  selector: 'login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private menuCtrl: MenuController, 
    private toastCtrl: ToastController,
    private userService: UserService, 
    private router: Router
  ) {
  }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  loginWithFacebook() {
    this.userService.signInWithProvider(new firebase.auth.FacebookAuthProvider())
      .then(_ => {
        this.navigateToHome();
    }, (error) => this.errorHandler(error));
  }

  loginWithGoogle() {
    this.userService.signInWithProvider(new firebase.auth.GoogleAuthProvider())
      .then(_ => {
        this.navigateToHome();
    }, (error) => this.errorHandler(error));
  }

  loginWithGithub() {
    this.userService.signInWithProvider(new firebase.auth.GithubAuthProvider())
      .then(_ => {
        this.navigateToHome();
    }, (error) => this.errorHandler(error));
  }

  private navigateToHome() {
    this.router.navigateByUrl('/');
    this.menuCtrl.enable(true);
  }

  private async errorHandler(e) {
    const toast = await this.toastCtrl.create({
      message: e.message || 'Unknown error'
    });
    toast.present();
  }

}
