import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountManagementPage } from "./account-management";

@NgModule({
  declarations: [AccountManagementPage],
  imports: [
    IonicPageModule.forChild(AccountManagementPage)
  ]
})

export class AccountManagementPageModule { }