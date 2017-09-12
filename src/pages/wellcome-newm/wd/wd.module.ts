import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WdPage } from './wd';
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';
import { SwiperNewmComponentModule } from '../../../components/swiper-newm/swiper-newm.module';
import { FooterRightsComponentModule } from '../../../components/footer-rights/footer-rights.module';

@NgModule({
   declarations: [
      WdPage,
   ],
   imports: [
      IonicPageModule.forChild(WdPage),
      ImgLazyLoadDirectiveModule,
      SwiperNewmComponentModule,
      FooterRightsComponentModule,
   ],
   exports: [
      WdPage
   ]
})
export class WdPageModule { }
