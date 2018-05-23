import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepaymentHistoryPage } from './repayment-history';

@NgModule({
  declarations: [
    RepaymentHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(RepaymentHistoryPage),
  ],
})
export class RepaymentHistoryPageModule {}
