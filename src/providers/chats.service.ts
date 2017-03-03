import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';


@Injectable()
export class ChatsService {

  constructor(public af: AngularFire) {
    
  }

}
