import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImgLazyLoadDirectiveModule } from "../../../../../directives/img-lazy-load/img-lazy-load.module";
import { ChangePhoneNumberPage } from './change-phone-number';

@NgModule({
  declarations: [ChangePhoneNumberPage],
  imports: [
    IonicPageModule.forChild(ChangePhoneNumberPage),
    ImgLazyLoadDirectiveModule
  ]
})

export class ChangePhoneNumberPageModule { }