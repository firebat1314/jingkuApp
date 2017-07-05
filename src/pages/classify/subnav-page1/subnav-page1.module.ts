import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubnavPage1Page } from "./subnav-page1";
import { ImgLazyLoadDirectiveModule } from "../../../directives/img-lazy-load/img-lazy-load.module";

@NgModule({
   declarations: [SubnavPage1Page],
   imports: [
      IonicPageModule.forChild(SubnavPage1Page),
      ImgLazyLoadDirectiveModule
   ]
})

export class SubnavPage1PageModule { }
