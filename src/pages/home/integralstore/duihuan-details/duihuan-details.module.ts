import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DuihuanDetailsPage } from "./duihuan-details";
import { ImgLazyLoadDirectiveModule } from "../../../../directives/img-lazy-load/img-lazy-load.module";
import { SwiperComponentModule } from "../../../../components/swiper/swiper.module";

@NgModule({
   declarations: [DuihuanDetailsPage],
   imports: [
      IonicPageModule.forChild(DuihuanDetailsPage),
      ImgLazyLoadDirectiveModule,
      SwiperComponentModule
   ]
})

export class DuihuanDetailsPageModule { }
