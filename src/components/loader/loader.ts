import { Component } from '@angular/core';

/**
 * Generated class for the LoaderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'loader',
  templateUrl: 'loader.html'
})
export class LoaderComponent {

  text: string;

  constructor() {
    console.log('Hello LoaderComponent Component');
    this.text = 'Hello World';
  }

}
