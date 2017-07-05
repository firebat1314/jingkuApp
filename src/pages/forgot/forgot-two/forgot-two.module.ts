import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgotTwoPage } from "./forgot-two";
import { ImgLazyLoadDirectiveModule } from "../../../directives/img-lazy-load/img-lazy-load.module";

@NgModule({
  declarations: [ForgotTwoPage],
  imports: [
    IonicPageModule.forChild(ForgotTwoPage),
    ImgLazyLoadDirectiveModule
  ]
})

export class ForgotTwoPageModule { }