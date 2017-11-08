import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountManagementPage } from "./account-management";
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';

@NgModule({
  declarations: [AccountManagementPage],
  imports: [
    IonicPageModule.forChild(AccountManagementPage),
    ImgLazyLoadDirectiveModule,
  ]
})

export class AccountManagementPageModule { }