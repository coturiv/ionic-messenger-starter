import { Component } from '@angular/core';

/*
  Generated class for the MessageCard component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'message-card',
  templateUrl: 'message-card.html'
})
export class MessageCardComponent {

  text: string;

  constructor() {
    console.log('Hello MessageCard Component');
    this.text = 'Hello World';
  }

}
