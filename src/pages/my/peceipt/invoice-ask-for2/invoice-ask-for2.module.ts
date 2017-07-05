import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoiceAskFor2Page } from "./invoice-ask-for2";
import { PhoneNumberFilterModule } from "../../../../pipes/phone-number-fiter/phone-number-fiter.module";

@NgModule({
  declarations: [InvoiceAskFor2Page],
  imports: [
    IonicPageModule.forChild(InvoiceAskFor2Page),
    PhoneNumberFilterModule
  ]
})

export class InvoiceAskFor2PageModule { }