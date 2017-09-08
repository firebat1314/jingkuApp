import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderWuliuPage } from "./order-wuliu";
import { ReversePipeModule } from '../../../../pipes/reverse/reverse.module';

@NgModule({
   declarations: [OrderWuliuPage],
   imports: [
      IonicPageModule.forChild(OrderWuliuPage),
      ReversePipeModule
   ]
})

export class OrderWuliuPageModule { }