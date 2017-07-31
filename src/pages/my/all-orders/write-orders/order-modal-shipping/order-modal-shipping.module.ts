import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderModalShippingPage } from "./order-modal-shipping";
import { PhoneNumberFilterModule } from "../../../../../pipes/phone-number-fiter/phone-number-fiter.module";

@NgModule({
  declarations: [OrderModalShippingPage],
  imports: [
    IonicPageModule.forChild(OrderModalShippingPage),
    PhoneNumberFilterModule
  ]
})

export class OrderModalShippingPageModule { }