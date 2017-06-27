import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreHomePage } from './store-home';

@NgModule({
  declarations: [
    StoreHomePage,
  ],
  imports: [
    IonicPageModule.forChild(StoreHomePage),
  ],
  exports: [
    StoreHomePage
  ]
})
export class StoreHomePageModule {}
