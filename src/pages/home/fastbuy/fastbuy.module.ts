import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FastbuyPage } from "./fastbuy";
import { CountdownComponentModule } from "../../../components/countdown/countdown.module";
import { ImgLazyLoadDirectiveModule } from "../../../directives/img-lazy-load/img-lazy-load.module";
import { NoGoodsComponentModule } from "../../../components/no-goods/no-goods.module";
import { AdsClickDirectiveModule } from '../../../directives/ads-click/ads-click.module';
import { ScrollToTopDirectiveModule } from '../../../directives/scroll-to-top/scroll-to-top.module';
import { PipesModule } from '../../../pipes/pipes.module';
import{ParticularsPageModule}from'../particulars/particulars.module'
import{fastbuy_infonModule}from'../fastbuy/fastbuy_info/fastbuy_info.module'
@NgModule({
  declarations: [FastbuyPage],
  imports: [
    IonicPageModule.forChild(FastbuyPage),
    CountdownComponentModule,
    ImgLazyLoadDirectiveModule,
    NoGoodsComponentModule,
    AdsClickDirectiveModule,
    ScrollToTopDirectiveModule,
    PipesModule,
    ParticularsPageModule,
    fastbuy_infonModule
  ]
})

export class FastbuyPageModule { }