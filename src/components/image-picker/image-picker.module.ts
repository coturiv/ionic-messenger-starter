import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImagePickerComponent } from './image-picker';

@NgModule({
  declarations: [
    ImagePickerComponent,
  ],
  imports: [
    IonicPageModule.forChild(ImagePickerComponent),
  ],
  exports: [
    ImagePickerComponent
  ]
})
export class ImagePickerComponentModule {}
