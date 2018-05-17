import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderDetailDistributionPage } from './order-detail-distribution';
import { OpenMoreDirectiveModule } from '../../../../directives/open-more/open-more.module';
import { PhoneNumberFilterModule } from '../../../../pipes/phone-number-fiter/phone-number-fiter.module';
import { ImgLazyLoadDirectiveModule } from '../../../../directives/img-lazy-load/img-lazy-load.module';

@NgModule({
  declarations: [
    OrderDetailDistributionPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderDetailDistributionPage),
    ImgLazyLoadDirectiveModule,
    OpenMoreDirectiveModule,
    PhoneNumberFilterModule,
  ],
})
export class OrderDetailDistributionPageModule {}
