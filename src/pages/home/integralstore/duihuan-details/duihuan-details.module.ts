import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DuihuanDetailsPage } from "./duihuan-details";
import { ImgLazyLoadDirectiveModule } from "../../../../directives/img-lazy-load/img-lazy-load.module";
import { IonicImageViewerModule } from "ionic-img-viewer";
import { SwiperComponentModule } from "../../../../components/swiper/swiper.module";

@NgModule({
   declarations: [DuihuanDetailsPage],
   imports: [
      IonicImageViewerModule,
      IonicPageModule.forChild(DuihuanDetailsPage),
      ImgLazyLoadDirectiveModule,
      SwiperComponentModule
   ]
})

export class DuihuanDetailsPageModule { }
