import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoiceQualificationPage } from "./invoice-qualification";

@NgModule({
  declarations: [InvoiceQualificationPage],
  imports: [
    IonicPageModule.forChild(InvoiceQualificationPage)
  ]
})

export class InvoiceQualificationPageModule { }