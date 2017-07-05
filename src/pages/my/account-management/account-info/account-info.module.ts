import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountInfoPage } from "./account-info";
import { PhoneNumberFilterModule } from "../../../../pipes/phone-number-fiter/phone-number-fiter.module";
import { ImgLazyLoadDirectiveModule } from "../../../../directives/img-lazy-load/img-lazy-load.module";

@NgModule({
  declarations: [AccountInfoPage],
  imports: [
    IonicPageModule.forChild(AccountInfoPage),
    PhoneNumberFilterModule,
    ImgLazyLoadDirectiveModule
  ]
})

export class AccountInfoPageModule { }