import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from "./signup";
import { ImgLazyLoadDirectiveModule } from "../../directives/img-lazy-load/img-lazy-load.module";

@NgModule({
  declarations: [SignupPage],
  imports: [
    IonicPageModule.forChild(SignupPage),
    ImgLazyLoadDirectiveModule
  ]
})

export class SignupPageModule { }