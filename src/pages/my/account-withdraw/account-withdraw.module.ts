import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountWithdrawPage } from "./account-withdraw";

@NgModule({
  declarations: [AccountWithdrawPage],
  imports: [
    IonicPageModule.forChild(AccountWithdrawPage)
  ]
})

export class AccountWithdrawPageModule { }