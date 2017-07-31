import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountAssetPage } from "./account-asset";

@NgModule({
  declarations: [AccountAssetPage],
  imports: [
    IonicPageModule.forChild(AccountAssetPage)
  ]
})

export class AccountAssetPageModule { }