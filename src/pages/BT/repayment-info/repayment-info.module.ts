import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepaymentInfoPage } from './repayment-info';

@NgModule({
  declarations: [
    RepaymentInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(RepaymentInfoPage),
  ],
})
export class RepaymentInfoPageModule {}
