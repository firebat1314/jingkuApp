import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoodslistPage } from "./goodslist";
import { ImgLazyLoadDirectiveModule } from "../../../../../directives/img-lazy-load/img-lazy-load.module";
@NgModule({
   declarations: [GoodslistPage],
   imports: [
      IonicPageModule.forChild(GoodslistPage),
      ImgLazyLoadDirectiveModule
   ]
})

export class GoodslistPageModule { }