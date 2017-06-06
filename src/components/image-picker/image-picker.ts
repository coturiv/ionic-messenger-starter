import { Component } from '@angular/core';

/**
 * Generated class for the ImagePickerComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'image-picker',
  templateUrl: 'image-picker.html'
})
export class ImagePickerComponent {

  text: string;

  constructor() {
    console.log('Hello ImagePickerComponent Component');
    this.text = 'Hello World';
  }

}
