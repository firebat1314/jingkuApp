import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JingkuFinancePage } from './jingku-finance';
import { ImgTabsModule } from '../../../components/img-tabs/img-tabs.module';
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';
import { AdsClickDirectiveModule } from '../../../directives/ads-click/ads-click.module';

@NgModule({
  declarations: [
    JingkuFinancePage,
  ],
  imports: [
    IonicPageModule.forChild(JingkuFinancePage),
    ImgLazyLoadDirectiveModule,
    ImgTabsModule,
    AdsClickDirectiveModule
  ],
})
export class JingkuFinancePageModule {}
