import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelMenuPage } from './wel-menu';

@NgModule({
   declarations: [
      WelMenuPage,
   ],
   imports: [
      IonicPageModule.forChild(WelMenuPage),
   ],
   exports: [
      WelMenuPage
   ]
})
export class WelMenuPageModule { }
