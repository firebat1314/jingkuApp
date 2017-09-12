import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JzPage } from './jz';
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';
import { SwiperNewmComponentModule } from '../../../components/swiper-newm/swiper-newm.module';
import { FooterRightsComponentModule } from '../../../components/footer-rights/footer-rights.module';

@NgModule({
   declarations: [
      JzPage,
   ],
   imports: [
      IonicPageModule.forChild(JzPage),
      ImgLazyLoadDirectiveModule,
      SwiperNewmComponentModule,
      FooterRightsComponentModule,
   ],
   exports: [
      JzPage
   ]
})
export class JzPageModule { }
