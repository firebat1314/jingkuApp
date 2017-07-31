import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountAreaApplicationPage } from "./account-area-application";

@NgModule({
  declarations: [AccountAreaApplicationPage],
  imports: [
    IonicPageModule.forChild(AccountAreaApplicationPage)
  ]
})

export class AccountAreaApplicationPageModule { }