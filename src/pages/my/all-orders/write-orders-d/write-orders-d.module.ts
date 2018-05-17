import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WriteOrdersDPage } from './write-orders-d';
import { PhoneNumberFilterModule } from '../../../../pipes/phone-number-fiter/phone-number-fiter.module';
import { ImgLazyLoadDirectiveModule } from '../../../../directives/img-lazy-load/img-lazy-load.module';

@NgModule({
  declarations: [
    WriteOrdersDPage,
  ],
  imports: [
    IonicPageModule.forChild(WriteOrdersDPage),
    ImgLazyLoadDirectiveModule,
    PhoneNumberFilterModule
  ],
})
export class WriteOrdersDPageModule {}
