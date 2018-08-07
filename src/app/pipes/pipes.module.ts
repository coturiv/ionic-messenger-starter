import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfilePipe } from './user-profile.pipe';
import { TimeAgoPipe } from './time-ago.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UserProfilePipe,
    TimeAgoPipe
  ],
  exports: [
    UserProfilePipe,
    TimeAgoPipe
  ]
})
export class PipesModule { }
