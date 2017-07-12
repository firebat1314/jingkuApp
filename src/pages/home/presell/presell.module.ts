import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PresellPage } from "./presell";
import { ImgLazyLoadDirectiveModule } from "../../../directives/img-lazy-load/img-lazy-load.module";
import { CountdownComponentModule } from "../../../components/countdown/countdown.module";

@NgModule({
  declarations: [PresellPage],
  imports: [
    IonicPageModule.forChild(PresellPage),
    CountdownComponentModule,
    ImgLazyLoadDirectiveModule
  ]
})

export class PresellPageModule { }