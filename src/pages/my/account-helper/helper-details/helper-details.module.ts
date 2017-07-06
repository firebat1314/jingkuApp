import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelperDetailsPage } from "./helper-details";

@NgModule({
  declarations: [HelperDetailsPage],
  imports: [
    IonicPageModule.forChild(HelperDetailsPage)
  ]
})

export class HelperDetailsPageModule { }