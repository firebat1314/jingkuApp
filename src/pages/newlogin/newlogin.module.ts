import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewloginPage } from './newlogin';

@NgModule({
   declarations: [
      NewloginPage,
   ],
   imports: [
      IonicPageModule.forChild(NewloginPage),
   ],
   exports: [
      NewloginPage
   ]
})
export class NewloginPageModule { }
