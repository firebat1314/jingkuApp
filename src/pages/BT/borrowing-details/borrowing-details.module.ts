import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BorrowingDetailsPage } from './borrowing-details';

@NgModule({
  declarations: [
    BorrowingDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BorrowingDetailsPage),
  ],
})
export class BorrowingDetailsPageModule {}
