import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupSecondPage } from "./signup-second";

@NgModule({
  declarations: [SignupSecondPage],
  imports: [
    IonicPageModule.forChild(SignupSecondPage)
  ]
})

export class SignupSecondPageModule { }