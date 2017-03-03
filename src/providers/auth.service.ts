import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Facebook, GooglePlus } from 'ionic-native';

import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Rx'; 

import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import firebase from 'firebase';

export enum AuthMode {
  Facebook,
  GooglePlus,
  Github
};

@Injectable()
export class AuthService {
  constructor(public af: AngularFire, private platform: Platform) {}

  getAuth() {
    return this.af.auth;
  }

  login(mode: AuthMode) {
    if (mode == AuthMode.GooglePlus)
      return this.signInWithGoogle();
    
    if (mode == AuthMode.Facebook)
      return this.signInWithFacebook();

    if (mode == AuthMode.Github)
      return this.signInWithGithub();
  }

  /**
   * sign in wiht google+
   */
  private signInWithGoogle() {
    if (!this.platform.is('cordova'))
      return this.signInWithProvider(AuthProviders.Google);
    
    return GooglePlus.login({
        'scopes': 'email profile',
        'webClientId': 'YOUR_WEB_CLIENT_ID'
      }).then( res => {
        return this.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken));
      }, (error) => Promise.reject(error));
  }

  /**
   * sign in with facebook
   */
  private signInWithFacebook() {
    if (!this.platform.is('cordova'))
      return this.signInWithProvider(AuthProviders.Facebook);
    
    return Facebook.login(['email', 'public_profile'])
      .then(res => {
        return this.signInWithCredential(firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken));
      }, (error) => Promise.reject(error));
  }

  /**
   * sign in with github
   */
  private signInWithGithub() {
    return this.signInWithProvider(AuthProviders.Github);
  }

  private signInWithProvider(provider: any, method: any = AuthMethods.Popup ) {
    return this.af.auth.login({ provider: provider, method: method })
  }

  private signInWithCredential(credential) {
    return firebase.auth().signInWithCredential(credential);
  }

  createAccount(data): firebase.Promise_Instance<void> {
    return this.af.database.object('users/' + data.uid).set(
        {
            uid         : data.auth.uid,
            email       : data.auth.email,
            displayName : data.auth.displayName,
            photoURL    : data.auth.photoURL,
            createdAt   : firebase.database['ServerValue']['TIMESTAMP'],
            providerData: data.auth.providerData[0]
        });
  }

  logout() {
    this.getAuth().logout();
  }

  /**
   * get current user (auth status)
   */
  get currentUser(): Observable<any> {
    return this.getAuth().first().map(user => user.auth);
  };
  
  /**
   * get full profile
   */
  getFullProfile(uid?: string): Observable<any> {
    if (uid)
      return this.af.database.object('users/' + uid);

    return this.getAuth().flatMap(auth => {
      return this.af.database.object('users/' + auth.uid);
    });
  }
}
