import { Injectable } from '@angular/core';

import { FirebaseService, AFSQuery } from './firebase.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends FirebaseService {

  constructor(afs: AngularFirestore, private afAuth: AngularFireAuth) {
    super(afs);
  }

  signInWithProvider(provider: any) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then(res => {
        return this.updateUser(res.user, res.additionalUserInfo.isNewUser);
    });
  }

  get currentUser() {
    return this.afAuth.authState
      .pipe(switchMap(auth => auth ? this.getUserById(auth.uid) : of(null)));
  }

  getUsers(filter?: {startAfter: any, limit: number}) {
    const query = new AFSQuery();
    query.limit = 10;
    if (filter) {
      query.startAfter = filter.startAfter;
      query.limit = filter.limit;
    }
    query.orderBy = ['createdAt', 'desc'];
    return super.collection('users', query);
  }

  getUserById(userId: string) {
    return this.doc(`users/${userId}`);
  }

  updateUser(user: any, isNewUser?: boolean) {
    if (isNewUser) {
      return Promise.resolve();
    }

    const newUser: any = {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    const provider = user.providerData && user.providerData[0];
    if (provider) {
      newUser.provider = Object.assign({}, provider);

      if (provider.providerId == 'facebook.com') {
        newUser.photoURL = `https://graph.facebook.com/${provider.uid}/picture?type=square`;
      }
    }

    return this.set('users', user.uid, newUser);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
}


