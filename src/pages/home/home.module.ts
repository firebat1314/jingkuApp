import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from "./home";
import { AdsClickDirectiveModule } from "../../directives/ads-click/ads-click.module";
import { SingleCardComponentModule } from "../../components/single-card/single-card.module";
import { ImgLazyLoadDirectiveModule } from "../../directives/img-lazy-load/img-lazy-load.module";
import { ScrollToTopDirectiveModule } from '../../directives/scroll-to-top/scroll-to-top.module';
import { AccountProcessProvider } from '../my/account-process/account-process-provider';

@NgModule({
   declarations: [
      HomePage,
   ],
   imports: [
      AdsClickDirectiveModule,
      IonicPageModule.forChild(HomePage),
      SingleCardComponentModule,
      ImgLazyLoadDirectiveModule,
      ScrollToTopDirectiveModule,
   ],
   providers: [AccountProcessProvider],
   exports: [
      HomePage
   ]
})
export class HomePageModule { }