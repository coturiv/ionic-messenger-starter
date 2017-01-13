import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFire, AuthProviders, FirebaseAuth, FirebaseAuthState, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {
  private authState: FirebaseAuthState;

  constructor(public af: AngularFire, public auth$: FirebaseAuth) {
    this.authState = auth$.getAuth();
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
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
    return this.auth$.login({
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

    return this.auth$.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    });
  }
}
