import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntegralstorePage } from "./integralstore";
import { ImgLazyLoadDirectiveModule } from "../../../directives/img-lazy-load/img-lazy-load.module";
import { AdsClickDirectiveModule } from '../../../directives/ads-click/ads-click.module';

@NgModule({
   declarations: [IntegralstorePage],
   imports: [
      IonicPageModule.forChild(IntegralstorePage),
      ImgLazyLoadDirectiveModule,
      AdsClickDirectiveModule
   ]
})

export class IntegralstorePageModule { }
