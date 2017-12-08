import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountMoneyDetailPage } from "./account-money-detail";
import { ScrollToTopDirectiveModule } from '../../../directives/scroll-to-top/scroll-to-top.module';
import { OpenMoreDirectiveModule } from '../../../directives/open-more/open-more.module';

@NgModule({
  declarations: [AccountMoneyDetailPage],
  imports: [
    IonicPageModule.forChild(AccountMoneyDetailPage),
    ScrollToTopDirectiveModule,
    OpenMoreDirectiveModule
  ],
  exports: [AccountMoneyDetailPage]
})

export class AccountMoneyDetailPageModule { }