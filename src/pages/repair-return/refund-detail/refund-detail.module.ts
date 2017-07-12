import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RefundDetailPage } from './refund-detail';

@NgModule({
  declarations: [
    RefundDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(RefundDetailPage),
  ],
  exports: [
    RefundDetailPage
  ]
})
export class RefundDetailPageModule {}
