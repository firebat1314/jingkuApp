import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImgLazyLoadDirectiveModule } from "../../directives/img-lazy-load/img-lazy-load.module";
import { WellcomeNewmPage } from "./wellcome-newm";
import { SwiperNewmComponentModule } from '../../components/swiper-newm/swiper-newm.module';
import { FooterRightsComponentModule } from '../../components/footer-rights/footer-rights.module';
import { WelHeaderComponentModule } from '../../components/wel-header/wel-header.module';

@NgModule({
   declarations: [
      WellcomeNewmPage,
   ],
   imports: [
      IonicPageModule.forChild(WellcomeNewmPage),
      ImgLazyLoadDirectiveModule,
      SwiperNewmComponentModule,
      FooterRightsComponentModule,
      WelHeaderComponentModule
   ],
   exports: [
      WellcomeNewmPage
   ]
})
export class WellcomeNewmPageModule { }
