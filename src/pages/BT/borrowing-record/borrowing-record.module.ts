import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BorrowingRecordPage } from './borrowing-record';

@NgModule({
  declarations: [
    BorrowingRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(BorrowingRecordPage),
  ],
})
export class BorrowingRecordPageModule {}
