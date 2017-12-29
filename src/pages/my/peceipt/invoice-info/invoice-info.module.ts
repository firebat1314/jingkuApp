import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoiceInfoPage } from './invoice-info';

@NgModule({
  declarations: [
    InvoiceInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(InvoiceInfoPage),
  ],
})
export class InvoiceInfoPageModule {}
