import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WriteOrdersPage } from "./write-orders";
import { ImgLazyLoadDirectiveModule } from "../../../../directives/img-lazy-load/img-lazy-load.module";
import { PhoneNumberFilterModule } from "../../../../pipes/phone-number-fiter/phone-number-fiter.module";

@NgModule({
  declarations: [WriteOrdersPage],
  imports: [
    IonicPageModule.forChild(WriteOrdersPage),
    ImgLazyLoadDirectiveModule,
    PhoneNumberFilterModule
  ]
})

export class WriteOrdersPageModule { }