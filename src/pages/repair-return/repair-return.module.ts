import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepairReturnPage } from './repair-return';

@NgModule({
  declarations: [
    RepairReturnPage,
  ],
  imports: [
    IonicPageModule.forChild(RepairReturnPage),
  ],
  exports: [
    RepairReturnPage
  ]
})
export class RepairReturnPageModule {}
