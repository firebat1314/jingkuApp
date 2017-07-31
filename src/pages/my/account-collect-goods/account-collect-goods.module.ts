import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountCollectGoodsPage } from "./account-collect-goods";
import { ImgLazyLoadDirectiveModule } from "../../../directives/img-lazy-load/img-lazy-load.module";
import { NothingComponentModule } from "../../../components/nothing/nothing.module";

@NgModule({
  declarations: [AccountCollectGoodsPage],
  imports: [
    IonicPageModule.forChild(AccountCollectGoodsPage),
    ImgLazyLoadDirectiveModule,
    NothingComponentModule
  ]
})

export class AccountCollectGoodsPageModule { }