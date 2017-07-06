import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscountCouponPage } from "./discount-coupon";
import { MyCanvasComponentModule } from "../../../components/my-canvas/my-canvas.module";

@NgModule({
  declarations: [DiscountCouponPage],
  imports: [
    IonicPageModule.forChild(DiscountCouponPage),
    MyCanvasComponentModule
  ]
})

export class DiscountCouponPageModule { }