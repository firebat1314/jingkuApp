import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GhsPage } from './ghs';
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';
import { SwiperNewmComponentModule } from '../../../components/swiper-newm/swiper-newm.module';
import { FooterRightsComponentModule } from '../../../components/footer-rights/footer-rights.module';

@NgModule({
   declarations: [
      GhsPage,
   ],
   imports: [
      IonicPageModule.forChild(GhsPage),
      ImgLazyLoadDirectiveModule,
      SwiperNewmComponentModule,
      FooterRightsComponentModule,
   ],
   exports: [
      GhsPage
   ]
})
export class GhsPageModule { }
