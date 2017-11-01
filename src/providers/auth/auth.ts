import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Observable } from 'rxjs/Rx';

import { AngularFireAuth } from 'angularfire2/auth';
import { FbRtdbProvider } from '../fb-rtdb/fb-rtdb';
import * as firebase from 'firebase/app';

import { tableNames, googleWebClientId } from '../../app/app.constants';

@Injectable()
export class AuthProvider {

  constructor(
    public afAuth: AngularFireAuth,
    public rtdb: FbRtdbProvider,
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
  signInWithFacebook(): Promise<any> {
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
  signInWithGoogle(): Promise<any> {
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
          return Promise.reject(error);
        });
      });
    } else {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
  }

  /**
   * sign in with github
   */
  signInWithGithub(): Promise<any> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }

  /**
   * sign in with emai & password
   */
  signInWithEmail(credential: any): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(credential.email, credential.password);
  }

  /**
   * sign up with email & password
   */
  signUpWithEmail(credential: any): Promise<void> {
    return this.afAuth.auth.createUserWithEmailAndPassword(credential.email, credential.password);
  }

  /**
   * sign out
   */
  signOut(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

  updateProfile(user): Promise<any> {
    user.updatedAt = firebase.database['ServerValue']['TIMESTAMP'];

    let providerData = user.providerData;
    if (providerData && providerData.providerId === 'facebook.com')
      user.photoURL = `https://graph.facebook.com/${providerData.uid}/picture?type=square`;
    
    return this.rtdb.update(tableNames.User, user.uid, user);
  }

  /**
   * get full profile
   */
  getFullProfile(uid?: string): Observable<UserModel> {
    if (uid)
      return this.rtdb.object(tableNames.User + '/' + uid);
    
    return this.getAuth().switchMap((user: firebase.User) => {
      return (user != null) ? this.rtdb.object(tableNames.User + '/' + user.uid) : Observable.empty();
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