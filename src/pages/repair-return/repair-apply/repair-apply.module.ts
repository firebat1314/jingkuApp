import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepairApplyPage } from './repair-apply';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    RepairApplyPage,
  ],
  imports: [
    IonicPageModule.forChild(RepairApplyPage),
    SuperTabsModule.forRoot()
  ],
  exports: [
    RepairApplyPage
  ]
})
export class RepairApplyPageModule { }
