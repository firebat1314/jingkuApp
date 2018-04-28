import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaffAccessPage } from './staff-access';

@NgModule({
   declarations: [
      StaffAccessPage,
   ],
   imports: [
      IonicPageModule.forChild(StaffAccessPage),
   ],
   exports: [
      StaffAccessPage
   ]
})
export class StaffAccessPageModule { }
