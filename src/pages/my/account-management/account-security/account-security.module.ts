import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountSecurityPage } from "./account-security";
import { PhoneNumberFilterModule } from "../../../../pipes/phone-number-fiter/phone-number-fiter.module";

@NgModule({
  declarations: [AccountSecurityPage],
  imports: [
    IonicPageModule.forChild(AccountSecurityPage),
    PhoneNumberFilterModule
  ]
})

export class AccountSecurityPageModule { }