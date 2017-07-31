import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoGoodsComponent } from "./no-goods";

@NgModule({
  declarations: [
    NoGoodsComponent,
  ],
  imports: [
    IonicPageModule.forChild(NoGoodsComponent),
  ],
  exports: [
    NoGoodsComponent
  ]
})
export class NoGoodsComponentModule {}