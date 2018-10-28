import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscountCouponPage } from "./discount-coupon";
import { MyCanvasComponentModule } from "../../../components/my-canvas/my-canvas.module";
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';
import { ScrollToTopDirectiveModule } from '../../../directives/scroll-to-top/scroll-to-top.module';

@NgModule({
  declarations: [DiscountCouponPage],
  imports: [
    IonicPageModule.forChild(DiscountCouponPage),
    MyCanvasComponentModule,
    ImgLazyLoadDirectiveModule,
    ScrollToTopDirectiveModule
  ]
})

export class DiscountCouponPageModule { }