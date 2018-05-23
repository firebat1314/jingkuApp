import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepaymentDetailsPage } from './repayment-details';

@NgModule({
  declarations: [
    RepaymentDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(RepaymentDetailsPage),
  ],
})
export class RepaymentDetailsPageModule {}
