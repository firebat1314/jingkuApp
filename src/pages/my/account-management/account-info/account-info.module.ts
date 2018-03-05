import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountInfoPage } from "./account-info";
import { PhoneNumberFilterModule } from "../../../../pipes/phone-number-fiter/phone-number-fiter.module";
import { ImgLazyLoadDirectiveModule } from "../../../../directives/img-lazy-load/img-lazy-load.module";
import { GetImageDirectiveModule } from '../../../../directives/get-image/get-image.module';

@NgModule({
  declarations: [AccountInfoPage],
  imports: [
    IonicPageModule.forChild(AccountInfoPage),
    PhoneNumberFilterModule,
    ImgLazyLoadDirectiveModule,
    GetImageDirectiveModule,
  ]
})

export class AccountInfoPageModule { }