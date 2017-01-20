import { Injectable } from '@angular/core';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable'; 

import { AngularFire, AuthProviders, FirebaseAuthState, AuthMethods } from 'angularfire2';

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
  signInWithGoogle(): firebase.Promise<FirebaseAuthState> {

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
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  /**
   * sign in with facebook
   */
  signInWithFacebook(): firebase.Promise<FirebaseAuthState> {

    /**
     * for ios/android login, please check https://github.com/angular/angularfire2/blob/master/docs/Auth-with-Ionic2.md
     */

    return this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    });
  }

  logout() {
    this.af.auth.logout();
  }

  get currentUser(): Observable<any> {
    return Observable.create((observer) => {
      this.af.auth.first().subscribe((authData) => {
        setTimeout(()=> {
          observer.next({
            uid:          authData.uid,
            displayName:  authData.auth.displayName,
            email:        authData.auth.email,
            photoUrl:     authData.auth.photoURL || 'assets/img/noimage.png'
          }, (error) => {
            observer.error(error);
          }, 200);
        });        
      });
    })
  }
}
