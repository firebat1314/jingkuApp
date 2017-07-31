import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangePhoneNumberPage } from "./change-phone-number";
import { ImgLazyLoadDirectiveModule } from "../../../../../directives/img-lazy-load/img-lazy-load.module";

@NgModule({
  declarations: [ChangePhoneNumberPage],
  imports: [
    IonicPageModule.forChild(ChangePhoneNumberPage),
    ImgLazyLoadDirectiveModule
  ]
})

export class ChangePhoneNumberPageModule { }