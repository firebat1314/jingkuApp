import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountBalancePage } from "./account-balance";

@NgModule({
  declarations: [AccountBalancePage],
  imports: [
    IonicPageModule.forChild(AccountBalancePage)
  ]
})

export class AccountBalancePageModule { }