import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoiceQualificationPage } from "./invoice-qualification";
import { GetImageDirectiveModule } from "../../../../directives/get-image/get-image.module";
import { OpenMoreDirectiveModule } from '../../../../directives/open-more/open-more.module';
import { ImgLazyLoadDirectiveModule } from '../../../../directives/img-lazy-load/img-lazy-load.module';

@NgModule({
  declarations: [InvoiceQualificationPage],
  imports: [
    IonicPageModule.forChild(InvoiceQualificationPage),
    GetImageDirectiveModule,
    OpenMoreDirectiveModule,
    ImgLazyLoadDirectiveModule
  ]
})

export class InvoiceQualificationPageModule { }