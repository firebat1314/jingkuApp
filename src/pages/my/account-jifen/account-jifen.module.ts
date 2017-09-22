import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountJifenPage } from "./account-jifen";
import { ScrollToTopDirectiveModule } from '../../../directives/scroll-to-top/scroll-to-top.module';

@NgModule({
  declarations: [AccountJifenPage],
  imports: [
    IonicPageModule.forChild(AccountJifenPage),
    ScrollToTopDirectiveModule
  ]
})

export class AccountJifenPageModule { }