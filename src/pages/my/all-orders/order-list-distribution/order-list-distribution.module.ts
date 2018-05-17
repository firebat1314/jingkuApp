import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderListDistributionPage } from './order-list-distribution';
import { OpenMoreDirectiveModule } from '../../../../directives/open-more/open-more.module';
import { ImgLazyLoadDirectiveModule } from '../../../../directives/img-lazy-load/img-lazy-load.module';
import { ImgTabsModule } from '../../../../components/img-tabs/img-tabs.module';
import { ScrollToTopDirectiveModule } from '../../../../directives/scroll-to-top/scroll-to-top.module';

@NgModule({
  declarations: [
    OrderListDistributionPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderListDistributionPage),
    ImgLazyLoadDirectiveModule,
    OpenMoreDirectiveModule,
    ImgTabsModule,
    ScrollToTopDirectiveModule,
  ],
})
export class OrderListDistributionPageModule {}
