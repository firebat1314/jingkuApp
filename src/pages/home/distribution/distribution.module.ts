import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImgLazyLoadDirectiveModule } from "../../../directives/img-lazy-load/img-lazy-load.module";
import { NoGoodsComponentModule } from "../../../components/no-goods/no-goods.module";
import { DistributionPage } from './distribution';

@NgModule({
  declarations: [DistributionPage],
  imports: [
    IonicPageModule.forChild(DistributionPage),
    ImgLazyLoadDirectiveModule,
    NoGoodsComponentModule,
  ]
})

export class DistributionPageModule { }