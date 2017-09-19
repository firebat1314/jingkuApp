import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountProcessPage } from "./account-process";
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';

@NgModule({
  declarations: [AccountProcessPage],
  imports: [
    IonicPageModule.forChild(AccountProcessPage),
    ImgLazyLoadDirectiveModule
  ]
})

export class AccountProcessPageModule { }