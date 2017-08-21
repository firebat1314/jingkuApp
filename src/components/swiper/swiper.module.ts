import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SwiperComponent } from './swiper';
import { ImgLazyLoadDirectiveModule } from "../../directives/img-lazy-load/img-lazy-load.module";
import { IonicImageViewerModule } from "ionic-img-viewer";

@NgModule({
  declarations: [
    SwiperComponent,
  ],
  imports: [
    IonicModule,
    ImgLazyLoadDirectiveModule,
    IonicImageViewerModule,
  ],
  exports: [
    SwiperComponent
  ]
})
export class SwiperComponentModule { }
