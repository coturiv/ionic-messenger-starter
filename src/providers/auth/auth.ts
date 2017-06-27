import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Observable } from 'rxjs/Rx';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { tableNames, googleWebClientId } from '../../app/app.constants';

@Injectable()
export class AuthProvider {

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public facebook: Facebook,
    public googleplus: GooglePlus,
    public platform: Platform
  ) {}

  /**
   * get auth state
   */
  get currentUser(): any {
    return this.getAuth().first();
  }

  /**
   * get auth
   */
  getAuth(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  /**
   * sign in with facebook
   */
  signInWithFacebook(): firebase.Promise<any> {
    if (this.platform.is('cordova')) {
      return this.platform.ready().then(() => {
        return this.facebook.login(['email', 'public_profile']).then((res) => {
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          return this.afAuth.auth.signInWithCredential(facebookCredential);
        });
      });
    } else {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }
  }

  /**
   * sign in with googleplus
   */
  signInWithGoogle(): firebase.Promise<any> {
    if (this.platform.is('cordova')) {
      return this.platform.ready().then(() => {
        return this.googleplus.login({
          'scopes': 'email',
          'webClientId' : googleWebClientId,
          'offline': true
        }).then((res) => {
          const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);
          return this.afAuth.auth.signInWithCredential(googleCredential);
        }, (error) => {
          return firebase.Promise.reject(error);
        });
      });
    } else {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
  }

  /**
   * sign in with github
   */
  signInWithGithub(): firebase.Promise<any> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }

  /**
   * sign in with emai & password
   */
  signInWithEmail(credential: any): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(credential.email, credential.password);
  }

  /**
   * sign up with email & password
   */
  signUpWithEmail(credential: any): firebase.Promise<void> {
    return this.afAuth.auth.createUserWithEmailAndPassword(credential.email, credential.password);
  }

  /**
   * sign out
   */
  signOut(): firebase.Promise<any> {
    return this.afAuth.auth.signOut();
  }

  updateProfile(user): firebase.Promise<any> {
    user.updatedAt = firebase.database['ServerValue']['TIMESTAMP'];

    let providerData = user.providerData;
    if (providerData && providerData.providerId === 'facebook.com')
      user.photoURL = `https://graph.facebook.com/${providerData.uid}/picture?type=square`;
      
    return this.db.object(tableNames.User + '/' + user.uid).update(user);
  }

  /**
   * get full profile
   */
  getFullProfile(uid?: string): Observable<UserModel> {
    if (uid)
      return this.db.object(tableNames.User + '/' + uid);
    
    return Observable.create((observer) => {
      this.getAuth().subscribe((user: firebase.User) => {
        if (user !== null)
          this.db.object(tableNames.User + '/' + user.uid).subscribe((res) => observer.next(res));
      });
    });
  }
}

export class UserModel {
  uid?: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  providerData?: any;
}