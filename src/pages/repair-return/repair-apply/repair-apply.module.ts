import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepairApplyPage } from './repair-apply';

@NgModule({
  declarations: [
    RepairApplyPage,
  ],
  imports: [
    IonicPageModule.forChild(RepairApplyPage),
  ],
  exports: [
    RepairApplyPage
  ]
})
export class RepairApplyPageModule {}
