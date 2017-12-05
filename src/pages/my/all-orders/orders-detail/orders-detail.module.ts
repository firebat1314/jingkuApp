import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdersDetailPage } from "./orders-detail";
import { ImgLazyLoadDirectiveModule } from "../../../../directives/img-lazy-load/img-lazy-load.module";
import { PhoneNumberFilterModule } from "../../../../pipes/phone-number-fiter/phone-number-fiter.module";
import { OpenMoreDirectiveModule } from '../../../../directives/open-more/open-more.module';

@NgModule({
  declarations: [OrdersDetailPage],
  imports: [
    IonicPageModule.forChild(OrdersDetailPage),
    ImgLazyLoadDirectiveModule,
    PhoneNumberFilterModule,
    OpenMoreDirectiveModule
  ]
})

export class OrdersDetailPageModule { }