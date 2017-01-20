import { Injectable } from '@angular/core';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable'; 

import { AngularFire, AuthProviders, FirebaseAuthState, AuthMethods } from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class AuthService {
  constructor(public af: AngularFire) {
    
  }

  getAuth(): Observable<FirebaseAuthState> {
    return this.af.auth;
  }

  /**
   * sign in wiht google
   */
  signInWithGoogle(): Observable<any> {

    /**
     * for ios/android login
     * -----------------------
      GooglePlus.login({
        'scopes': 'email',
        'webClientId': 'YOUR_WEB_CLIENT_ID'
      }).then( res => {
        let provider  = firebase.auth.GoogleAuthProvider.credential(res.idToken);
        firebase.auth().signInWithCredential(provider)
      }, (error) => {
        console.log('Error: ' + JSON.stringify(error));
      });
     *------------------------
    */
    return Observable.create((observer) => {
      this.af.auth.login({ provider: AuthProviders.Google, method: AuthMethods.Popup })
        .then((authData) => {
          this.getFullProfile(authData.uid).first()
            .subscribe((user) => {
              if (user.$value == null) {
                this.createUser(authData).then((res) => observer.next(res), (error) => observer.error(error));
              }
            }, (error) => observer.error(error));
        }, (error) => observer.error(error));
    });
  }

  /**
   * sign in with facebook
   */
  signInWithFacebook(): Observable<any> {

    /**
     * for ios/android login, please check https://github.com/angular/angularfire2/blob/master/docs/Auth-with-Ionic2.md
     */
    return Observable.create((observer) => {
      this.af.auth.login({ provider: AuthProviders.Facebook, method: AuthMethods.Popup })
        .then((authData) => {
          this.getFullProfile(authData.uid).first()
            .subscribe((user) => {
              if (user.$value == null) {
                this.createUser(authData).then((res) => observer.next(res), (error) => observer.error(error));
              }
            }, (error) => observer.error(error));
        }, (error) => observer.error(error));
    });
  }

  signInWithGithub(): Observable<any> {
    return Observable.create((observer) => {
      this.af.auth.login({ provider: AuthProviders.Github, method: AuthMethods.Redirect })
        .then((authData) => {
          this.getFullProfile(authData.uid).first()
            .subscribe((user) => {
              if (user.$value == null) {
                this.createUser(authData).then((res) => observer.next(res), (error) => observer.error(error));
              }
            }, (error) => observer.error(error));
        }, (error) => observer.error(error));
    });
  }

  createUser(authData: FirebaseAuthState): firebase.Promise_Instance<void> {
    return this.af.database.object('users/' + authData.uid)
      .set({
        uid: authData.auth.uid,
        email: authData.auth.email,
        isEmailVerified: authData.auth.emailVerified,
        displayName: authData.auth.displayName,
        photoURL: authData.auth.photoURL,
        createdAt: firebase.database['ServerValue']['TIMESTAMP'],
        providerData: authData.auth.providerData[0]
      });
  }

  logout() {
    this.af.auth.logout();
  }

  get currentUser(): Observable<any> {
    return Observable.create((observer) => {
      this.af.auth.first().subscribe(
        (authData) => observer.next(authData.auth), (error) => observer.error(error));
    });
  };

  getFullProfile(uid: string): Observable<any> {
    return this.af.database.object('users/' + uid);
  }
}
