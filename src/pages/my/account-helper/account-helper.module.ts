import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountHelperPage } from "./account-helper";
import { ImgLazyLoadDirectiveModule } from "../../../directives/img-lazy-load/img-lazy-load.module";

@NgModule({
  declarations: [AccountHelperPage],
  imports: [
    IonicPageModule.forChild(AccountHelperPage),
    ImgLazyLoadDirectiveModule
  ]
})

export class AccountHelperPageModule { }