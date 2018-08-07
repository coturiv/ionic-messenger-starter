import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../services/user.service';
import { of } from 'rxjs';

@Pipe({
  name: 'userProfile'
})
export class UserProfilePipe implements PipeTransform {

  constructor(private userService: UserService) {
  }

  transform(userId: string) {    
    return userId ? this.userService.getUserById(userId) : of(null);
  }

}
