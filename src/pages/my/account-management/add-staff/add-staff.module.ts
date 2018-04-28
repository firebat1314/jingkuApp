import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddStaffPage } from './add-staff';
import { ImgLazyLoadDirectiveModule } from '../../../../directives/img-lazy-load/img-lazy-load.module';
import { StrVerifyComponentModule } from '../../../../components/str-verify/str-verify.module';
import { PhoneVerifyComponentModule } from '../../../../components/phone-verify/phone-verify.module';

@NgModule({
   declarations: [
      AddStaffPage,
   ],
   imports: [
      IonicPageModule.forChild(AddStaffPage),
      ImgLazyLoadDirectiveModule,
      StrVerifyComponentModule,
      PhoneVerifyComponentModule
   ],
   exports: [
      AddStaffPage
   ]
})
export class NewMyPageModule { }
