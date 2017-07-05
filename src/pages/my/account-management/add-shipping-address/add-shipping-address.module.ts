import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddShippingAddressPage } from "./add-shipping-address";
import { CityPickerModule } from "ionic2-city-picker/dist/city-picker.module";
import { PhoneNumberFilterModule } from "../../../../pipes/phone-number-fiter/phone-number-fiter.module";

@NgModule({
  declarations: [AddShippingAddressPage],
  imports: [
    IonicPageModule.forChild(AddShippingAddressPage),
    CityPickerModule,
    PhoneNumberFilterModule
  ]
})

export class AddShippingAddressPageModule { }