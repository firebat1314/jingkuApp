import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderModalCouponPage } from "./order-modal-coupon";

@NgModule({
  declarations: [OrderModalCouponPage],
  imports: [
    IonicPageModule.forChild(OrderModalCouponPage)
  ]
})

export class OrderModalCouponPageModule { }