import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImgLazyLoadDirectiveModule } from "../../../directives/img-lazy-load/img-lazy-load.module";
import { NoGoodsComponentModule } from "../../../components/no-goods/no-goods.module";
import { DistributionPage } from './distribution';
import { AdsClickDirectiveModule } from '../../../directives/ads-click/ads-click.module';

@NgModule({
  declarations: [DistributionPage],
  imports: [
    IonicPageModule.forChild(DistributionPage),
    ImgLazyLoadDirectiveModule,
    NoGoodsComponentModule,
    AdsClickDirectiveModule
  ]
})

export class DistributionPageModule { }