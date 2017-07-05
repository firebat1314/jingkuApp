import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from "./home";
import { AdsClickDirectiveModule } from "../../directives/ads-click/ads-click.module";
import { SingleCardComponentModule } from "../../components/single-card/single-card.module";
import { ImgLazyLoadDirectiveModule } from "../../directives/img-lazy-load/img-lazy-load.module";

@NgModule({
   declarations: [
      HomePage,
   ],
   imports: [
      IonicPageModule.forChild(HomePage),
      AdsClickDirectiveModule,
      SingleCardComponentModule,
      ImgLazyLoadDirectiveModule
   ],
   exports: [
      HomePage
   ]
})
export class HomePageModule { }