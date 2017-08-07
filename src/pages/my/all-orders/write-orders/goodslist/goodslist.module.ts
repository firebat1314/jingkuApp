import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoodslistPage } from "./goodslist";
@NgModule({
   declarations: [GoodslistPage],
   imports: [
      IonicPageModule.forChild(GoodslistPage)
   ]
})

export class GoodslistPageModule { }