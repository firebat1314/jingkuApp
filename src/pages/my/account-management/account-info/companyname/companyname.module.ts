import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanynamePage } from "./companyname";

@NgModule({
  declarations: [CompanynamePage],
  imports: [
    IonicPageModule.forChild(CompanynamePage)
  ]
})

export class CompanynamePageModule { }