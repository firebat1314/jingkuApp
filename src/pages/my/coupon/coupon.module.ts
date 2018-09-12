import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CouponPage } from "./coupon";
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';
import { OpenMoreDirectiveModule } from '../../../directives/open-more/open-more.module';
import { ScrollToTopDirectiveModule } from '../../../directives/scroll-to-top/scroll-to-top.module';

@NgModule({
  declarations: [CouponPage],
  imports: [
    IonicPageModule.forChild(CouponPage),
    ImgLazyLoadDirectiveModule,
    ScrollToTopDirectiveModule,
    OpenMoreDirectiveModule,
  ]
})

export class CouponPageModule { }