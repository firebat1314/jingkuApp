import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayAndShipPage } from "./pay-and-ship";
@NgModule({
   declarations: [PayAndShipPage],
   imports: [
      IonicPageModule.forChild(PayAndShipPage)
   ]
})

export class PayAndShipPageModule { }