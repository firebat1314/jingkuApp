import { NgModule } from '@angular/core';
import { ImgLazyLoadComponent } from './img-lazy-load';
import { IonicModule } from "ionic-angular";

@NgModule({
  declarations: [
    ImgLazyLoadComponent,
  ],
  imports: [
    IonicModule
  ],
  exports: [
    ImgLazyLoadComponent
  ]
})
export class ImgLazyLoadComponentModule { }
