import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoreBrandPage } from "./more-brand";
import { AdsClickDirectiveModule } from "../../../directives/ads-click/ads-click.module";
import { ImgLazyLoadDirectiveModule } from "../../../directives/img-lazy-load/img-lazy-load.module";
@NgModule({
   declarations: [MoreBrandPage],
   imports: [
      IonicPageModule.forChild(MoreBrandPage),
      AdsClickDirectiveModule,
      ImgLazyLoadDirectiveModule
   ]
})
export class MoreBrandPageModule { }
