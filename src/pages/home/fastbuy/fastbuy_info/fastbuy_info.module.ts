import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdsClickDirectiveModule } from "../../../../directives/ads-click/ads-click.module";
import { fastbuy_infonPage } from "../fastbuy_info/fastbuy_info";
import { NoGoodsComponentModule } from "../../../../components/no-goods/no-goods.module";
import { ImgLazyLoadDirectiveModule } from "../../../../directives/img-lazy-load/img-lazy-load.module";
import { PipesModule } from '../../../../pipes/pipes.module';
import { CountdownComponentModule } from "../../../../components/countdown/countdown.module";
import{ParticularsPageModule}from'../../particulars/particulars.module'
@NgModule({
   declarations: [fastbuy_infonPage],
   imports: [
      IonicPageModule.forChild(fastbuy_infonPage),
      AdsClickDirectiveModule,
      ImgLazyLoadDirectiveModule,
      NoGoodsComponentModule,
      PipesModule,
      CountdownComponentModule,
      ParticularsPageModule
   ]
})

export class fastbuy_infonModule { }
