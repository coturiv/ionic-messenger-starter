import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreloadImageComponent } from './preload-image';

@NgModule({
  declarations: [
    PreloadImageComponent,
  ],
  imports: [
    IonicPageModule.forChild(PreloadImageComponent),
  ],
  exports: [
    PreloadImageComponent
  ]
})
export class PreloadImageComponentModule {}
