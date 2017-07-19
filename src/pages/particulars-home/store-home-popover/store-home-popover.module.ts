import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreHomePopoverPage } from "./store-home-popover";

@NgModule({
  declarations: [
    StoreHomePopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(StoreHomePopoverPage)
  ],
  exports: [
    StoreHomePopoverPage
  ]
})
export class StoreHomePopoverPageModule {}
