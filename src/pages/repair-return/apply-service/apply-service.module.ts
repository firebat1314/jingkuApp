import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyServicePage } from './apply-service';
import { ImgLazyLoadDirectiveModule } from "../../../directives/img-lazy-load/img-lazy-load.module";
import { CountInputComponentModule } from "../../../components/count-input/count-input.module";
import { PhoneNumberFilterModule } from "../../../pipes/phone-number-fiter/phone-number-fiter.module";

@NgModule({
  declarations: [
    ApplyServicePage,
  ],
  imports: [
    IonicPageModule.forChild(ApplyServicePage),
    ImgLazyLoadDirectiveModule,
    CountInputComponentModule,
    PhoneNumberFilterModule
  ],
  exports: [
    ApplyServicePage
  ]
})
export class ApplyServicePageModule {}
