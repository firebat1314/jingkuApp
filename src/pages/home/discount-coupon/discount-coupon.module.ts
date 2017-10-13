import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscountCouponPage } from "./discount-coupon";
import { MyCanvasComponentModule } from "../../../components/my-canvas/my-canvas.module";
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';

@NgModule({
  declarations: [DiscountCouponPage],
  imports: [
    IonicPageModule.forChild(DiscountCouponPage),
    MyCanvasComponentModule,
    ImgLazyLoadDirectiveModule
  ]
})

export class DiscountCouponPageModule { }