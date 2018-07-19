import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParticularsPage } from "./particulars";
import { CountdownComponentModule } from "../../../components/countdown/countdown.module";
import { ImgLazyLoadDirectiveModule } from "../../../directives/img-lazy-load/img-lazy-load.module";
import { SwiperComponentModule } from "../../../components/swiper/swiper.module";
import { CityPickerModule } from "ionic2-city-picker/dist/city-picker.module";
import { OpenMoreDirectiveModule } from "../../../directives/open-more/open-more.module";
import { ScrollToTopDirectiveModule } from '../../../directives/scroll-to-top/scroll-to-top.module';
import { ParallaxHeaderModule } from '../../../directives/parallax-header/parallax-header.module';
import { BypassSecurityTrustHtmlPipeModule } from '../../../pipes/bypass-security-trust-html/bypass-security-trust-html.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { ComponentsModule } from '../../../components/components.module';
import { Ionic2RatingModule } from 'ionic2-rating';
@NgModule({
   declarations: [
      ParticularsPage,
   ],
   imports: [
      IonicPageModule.forChild(ParticularsPage),
      ImgLazyLoadDirectiveModule,
      CountdownComponentModule,
      SwiperComponentModule,
      CityPickerModule,
      OpenMoreDirectiveModule,
      ScrollToTopDirectiveModule,
      ParallaxHeaderModule,
      BypassSecurityTrustHtmlPipeModule,
      PipesModule,
      ComponentsModule,
      Ionic2RatingModule
   ]
})

export class ParticularsPageModule { }
