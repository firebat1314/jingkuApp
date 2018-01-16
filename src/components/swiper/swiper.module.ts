import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SwiperComponent } from './swiper';
import { ImgLazyLoadDirectiveModule } from "../../directives/img-lazy-load/img-lazy-load.module";

@NgModule({
  declarations: [
    SwiperComponent,
  ],
  imports: [
    IonicModule,
    ImgLazyLoadDirectiveModule,
  ],
  exports: [
    SwiperComponent
  ]
})
export class SwiperComponentModule { }
