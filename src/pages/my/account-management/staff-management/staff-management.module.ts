import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaffManagementPage } from './staff-management';

@NgModule({
   declarations: [
      StaffManagementPage,
   ],
   imports: [
      IonicPageModule.forChild(StaffManagementPage),
   ],
   exports: [
      StaffManagementPage
   ]
})
export class NewMyPageModule { }
