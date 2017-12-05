import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoiceAskFor1Page } from "./invoice-ask-for1";
import { ScrollToTopDirectiveModule } from '../../../../directives/scroll-to-top/scroll-to-top.module';
import { OpenMoreDirectiveModule } from '../../../../directives/open-more/open-more.module';

@NgModule({
  declarations: [InvoiceAskFor1Page],
  imports: [
    IonicPageModule.forChild(InvoiceAskFor1Page),
    ScrollToTopDirectiveModule,
    OpenMoreDirectiveModule
  ]
})

export class InvoiceAskFor1PageModule { }