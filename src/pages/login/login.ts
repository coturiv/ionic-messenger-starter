import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: FormGroup;
  homePage: any;

  constructor(public nav: NavController) {
    this.homePage = TabsPage;

    this.login = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('test', Validators.required)
    });
  }

  loginWithFacebook() {
    this.nav.setRoot(this.homePage);
  }

  loginWithGoogle() {
    this.nav.setRoot(this.homePage);
  }
}
