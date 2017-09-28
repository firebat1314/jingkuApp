import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountMoneyDetailPage } from "./account-money-detail";

@NgModule({
  declarations: [AccountMoneyDetailPage],
  imports: [
    IonicPageModule.forChild(AccountMoneyDetailPage)
  ],
  exports: [AccountMoneyDetailPage]
})

export class AccountMoneyDetailPageModule { }