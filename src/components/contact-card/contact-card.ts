import { Component } from '@angular/core';

/*
  Generated class for the ContactCard component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'contact-card',
  templateUrl: 'contact-card.html'
})
export class ContactCardComponent {

  text: string;

  constructor() {
    console.log('Hello ContactCard Component');
    this.text = 'Hello World';
  }

}
