import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountHistoryPage } from "./account-history";
import { ImgLazyLoadDirectiveModule } from "../../../directives/img-lazy-load/img-lazy-load.module";
import { NothingComponentModule } from "../../../components/nothing/nothing.module";

@NgModule({
  declarations: [AccountHistoryPage],
  imports: [
    IonicPageModule.forChild(AccountHistoryPage),
    ImgLazyLoadDirectiveModule,
    NothingComponentModule
  ]
})

export class AccountHistoryPageModule { }