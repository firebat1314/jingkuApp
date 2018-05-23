import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CertificationPage } from './certification';
import { PhoneVerifyComponentModule } from '../../../components/phone-verify/phone-verify.module';
import { StrVerifyComponentModule } from '../../../components/str-verify/str-verify.module';

@NgModule({
  declarations: [
    CertificationPage,
  ],
  imports: [
    IonicPageModule.forChild(CertificationPage),
    PhoneVerifyComponentModule,
    StrVerifyComponentModule
  ],
})
export class CertificationPageModule {}
