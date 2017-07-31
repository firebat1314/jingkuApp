import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdsClickDirectiveModule } from "../../../directives/ads-click/ads-click.module";
import { GlassesDesignPage } from "./glasses-design";
import { ImgLazyLoadDirectiveModule } from "../../../directives/img-lazy-load/img-lazy-load.module";

@NgModule({
   declarations: [GlassesDesignPage],
   imports: [
      IonicPageModule.forChild(GlassesDesignPage),
      AdsClickDirectiveModule,
      ImgLazyLoadDirectiveModule
   ]
})

export class GlassesDesignPageModule { }
