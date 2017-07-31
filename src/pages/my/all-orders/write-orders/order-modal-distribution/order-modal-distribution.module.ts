import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderModalDistributionPage } from "./order-modal-distribution";

@NgModule({
  declarations: [OrderModalDistributionPage],
  imports: [
    IonicPageModule.forChild(OrderModalDistributionPage)
  ]
})

export class OrderModalDistributionPageModule { }