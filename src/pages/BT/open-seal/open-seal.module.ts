import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpenSealPage } from './open-seal';
import { PhoneVerifyComponentModule } from '../../../components/phone-verify/phone-verify.module';
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';

@NgModule({
  declarations: [
    OpenSealPage,
  ],
  imports: [
    IonicPageModule.forChild(OpenSealPage),
    PhoneVerifyComponentModule,
    ImgLazyLoadDirectiveModule
  ],
})
export class OpenSealPageModule {}
