import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParticularsPage } from "./particulars";
import { CountdownComponentModule } from "../../../components/countdown/countdown.module";
import { ImgLazyLoadDirectiveModule } from "../../../directives/img-lazy-load/img-lazy-load.module";
import { IonicImageViewerModule } from "ionic-img-viewer";
import { SwiperComponentModule } from "../../../components/swiper/swiper.module";
import { CityPickerModule } from "ionic2-city-picker/dist/city-picker.module";

@NgModule({
   declarations: [
      ParticularsPage,
   ],
   imports: [
      IonicPageModule.forChild(ParticularsPage),
      ImgLazyLoadDirectiveModule,
      CountdownComponentModule,
      IonicImageViewerModule,
      SwiperComponentModule,
      CityPickerModule,
   ]
})

export class ParticularsPageModule { }
