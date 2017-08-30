import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrandPage } from "./brand";
import { AdsClickDirectiveModule } from "../../../directives/ads-click/ads-click.module";
import { ImgLazyLoadDirectiveModule } from "../../../directives/img-lazy-load/img-lazy-load.module";

@NgModule({
   declarations: [BrandPage],
   imports: [
      IonicPageModule.forChild(BrandPage),
      AdsClickDirectiveModule,
      ImgLazyLoadDirectiveModule,
   ]
})

export class BrandPageModule { }