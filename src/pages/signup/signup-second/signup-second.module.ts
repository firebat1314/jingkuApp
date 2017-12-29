import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupSecondPage } from "./signup-second";
import { GetImageDirectiveModule } from "../../../directives/get-image/get-image.module";
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';

@NgModule({
  declarations: [SignupSecondPage],
  imports: [
    IonicPageModule.forChild(SignupSecondPage),
    GetImageDirectiveModule,
    ImgLazyLoadDirectiveModule,
  ]
})

export class SignupSecondPageModule { }