import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GhsPage } from './ghs';
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';
import { SwiperNewmComponentModule } from '../../../components/swiper-newm/swiper-newm.module';
import { FooterRightsComponentModule } from '../../../components/footer-rights/footer-rights.module';
import { WelHeaderComponentModule } from '../../../components/wel-header/wel-header.module';
import { ScrollToTopDirectiveModule } from '../../../directives/scroll-to-top/scroll-to-top.module';

@NgModule({
   declarations: [
      GhsPage,
   ],
   imports: [
      IonicPageModule.forChild(GhsPage),
      ImgLazyLoadDirectiveModule,
      SwiperNewmComponentModule,
      FooterRightsComponentModule,
      WelHeaderComponentModule,
      ScrollToTopDirectiveModule
   ],
   exports: [
      GhsPage
   ]
})
export class GhsPageModule { }
