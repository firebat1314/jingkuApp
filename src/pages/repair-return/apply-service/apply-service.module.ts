import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyServicePage } from './apply-service';
import { ImgLazyLoadDirectiveModule } from "../../../directives/img-lazy-load/img-lazy-load.module";
import { CountInputComponentModule } from "../../../components/count-input/count-input.module";
import { PhoneNumberFilterModule } from "../../../pipes/phone-number-fiter/phone-number-fiter.module";
import { GetImageDirectiveModule } from '../../../directives/get-image/get-image.module';

@NgModule({
  declarations: [
    ApplyServicePage,
  ],
  imports: [
    IonicPageModule.forChild(ApplyServicePage),
    ImgLazyLoadDirectiveModule,
    CountInputComponentModule,
    PhoneNumberFilterModule,
    GetImageDirectiveModule,
  ],
  exports: [
    ApplyServicePage
  ]
})
export class ApplyServicePageModule {}
