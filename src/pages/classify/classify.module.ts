import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassifyPage } from "./classify";
import { NothingComponentModule } from "../../components/nothing/nothing.module";
import { ImgLazyLoadDirectiveModule } from "../../directives/img-lazy-load/img-lazy-load.module";
import { AdsClickDirectiveModule } from "../../directives/ads-click/ads-click.module";

@NgModule({
   declarations: [ClassifyPage],
   imports: [
      IonicPageModule.forChild(ClassifyPage),
      NothingComponentModule,
      ImgLazyLoadDirectiveModule,
      AdsClickDirectiveModule
   ]
})

export class ClassifyPageModule { }
