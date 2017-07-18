import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReasonModalPage } from "./reason-modal";

@NgModule({
  declarations: [
    ReasonModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ReasonModalPage),
  ],
  exports: [
    ReasonModalPage
  ]
})
export class ReasonModalPageModule {}
