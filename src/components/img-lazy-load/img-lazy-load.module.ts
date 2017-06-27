import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImgLazyLoadComponent } from './img-lazy-load';
import { IonicImageViewerModule } from "ionic-img-viewer/dist/ionic-img-viewer";

@NgModule({
  declarations: [
    ImgLazyLoadComponent,
  ],
  imports: [
    IonicPageModule.forChild(ImgLazyLoadComponent),
    IonicImageViewerModule,
  ],
  exports: [
    ImgLazyLoadComponent
  ]
})
export class ImgLazyLoadComponentModule { }
