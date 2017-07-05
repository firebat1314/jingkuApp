import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderModalPaymentPage } from "./order-modal-payment";

@NgModule({
  declarations: [OrderModalPaymentPage],
  imports: [
    IonicPageModule.forChild(OrderModalPaymentPage)
  ]
})

export class OrderModalPaymentPageModule { }