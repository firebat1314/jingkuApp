import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountProcessPage } from "./account-process";
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';
import { ScrollToTopDirectiveModule } from '../../../directives/scroll-to-top/scroll-to-top.module';
import { NothingComponentModule } from '../../../components/nothing/nothing.module';
import { NoGoodsComponentModule } from '../../../components/no-goods/no-goods.module';

@NgModule({
  declarations: [AccountProcessPage],
  imports: [
    IonicPageModule.forChild(AccountProcessPage),
    ImgLazyLoadDirectiveModule,
    ScrollToTopDirectiveModule,
    NothingComponentModule,
    NoGoodsComponentModule
  ]
})

export class AccountProcessPageModule { }