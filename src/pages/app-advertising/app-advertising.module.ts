import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarPage } from "./car";
import { AppAdvertisingPage } from "./app-advertising";
@NgModule({
   declarations: [AppAdvertisingPage],
   imports: [
      IonicPageModule.forChild(AppAdvertisingPage),
   ]
})
export class AppAdvertisingPageModule { }
