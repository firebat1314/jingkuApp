import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelperDetailsPage } from "./helper-details";
import { ScrollToTopDirectiveModule } from '../../../../directives/scroll-to-top/scroll-to-top.module';

@NgModule({
  declarations: [HelperDetailsPage],
  imports: [
    IonicPageModule.forChild(HelperDetailsPage),
    ScrollToTopDirectiveModule
  ]
})

export class HelperDetailsPageModule { }