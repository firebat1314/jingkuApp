import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FastbuyPage } from "./fastbuy";
import { CountdownComponentModule } from "../../../components/countdown/countdown.module";
import { ImgLazyLoadDirectiveModule } from "../../../directives/img-lazy-load/img-lazy-load.module";
import { NoGoodsComponentModule } from "../../../components/no-goods/no-goods.module";

@NgModule({
  declarations: [FastbuyPage],
  imports: [
    IonicPageModule.forChild(FastbuyPage),
    CountdownComponentModule,
    ImgLazyLoadDirectiveModule,
    NoGoodsComponentModule
  ]
})

export class FastbuyPageModule { }