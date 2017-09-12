import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WdPage } from './wd';
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';
import { SwiperNewmComponentModule } from '../../../components/swiper-newm/swiper-newm.module';
import { FooterRightsComponentModule } from '../../../components/footer-rights/footer-rights.module';
import { WelHeaderComponentModule } from '../../../components/wel-header/wel-header.module';

@NgModule({
   declarations: [
      WdPage,
   ],
   imports: [
      IonicPageModule.forChild(WdPage),
      ImgLazyLoadDirectiveModule,
      SwiperNewmComponentModule,
      FooterRightsComponentModule,
      WelHeaderComponentModule
   ],
   exports: [
      WdPage
   ]
})
export class WdPageModule { }
