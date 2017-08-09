import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayAndShipPage } from "./pay-and-ship";
import { ImgLazyLoadDirectiveModule } from "../../../../../directives/img-lazy-load/img-lazy-load.module";
@NgModule({
   declarations: [PayAndShipPage],
   imports: [
      IonicPageModule.forChild(PayAndShipPage),
      ImgLazyLoadDirectiveModule
   ]
})

export class PayAndShipPageModule { }