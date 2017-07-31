import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShippingAddressPage } from "./shipping-address";
import { PhoneNumberFilterModule } from "../../../../pipes/phone-number-fiter/phone-number-fiter.module";

@NgModule({
  declarations: [ShippingAddressPage],
  imports: [
    IonicPageModule.forChild(ShippingAddressPage),
    PhoneNumberFilterModule
  ]
})

export class ShippingAddressPageModule { }