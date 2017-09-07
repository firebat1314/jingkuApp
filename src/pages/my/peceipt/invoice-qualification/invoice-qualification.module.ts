import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoiceQualificationPage } from "./invoice-qualification";
import { GetImageDirectiveModule } from "../../../../directives/get-image/get-image.module";

@NgModule({
  declarations: [InvoiceQualificationPage],
  imports: [
    IonicPageModule.forChild(InvoiceQualificationPage),
    GetImageDirectiveModule
  ]
})

export class InvoiceQualificationPageModule { }