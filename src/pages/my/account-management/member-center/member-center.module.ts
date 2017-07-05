import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberCenterPage } from "./member-center";
import { PhoneNumberFilterModule } from "../../../../pipes/phone-number-fiter/phone-number-fiter.module";
import { ImgLazyLoadDirectiveModule } from "../../../../directives/img-lazy-load/img-lazy-load.module";

@NgModule({
  declarations: [MemberCenterPage],
  imports: [
    IonicPageModule.forChild(MemberCenterPage),
    PhoneNumberFilterModule,
    ImgLazyLoadDirectiveModule
  ]
})

export class MemberCenterPageModule { }