import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountServicePage } from "./account-service";

@NgModule({
  declarations: [AccountServicePage],
  imports: [
    IonicPageModule.forChild(AccountServicePage)
  ]
})

export class AccountServicePageModule { }