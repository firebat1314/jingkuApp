import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarPage } from "./car";
import { AppAdvertisingPage } from "./app-advertising";
import { AdsClickDirectiveModule } from '../../directives/ads-click/ads-click.module';
import { LazyLoadDirectiveModule } from '../../directives/lazy-load/lazy-load.module';

@NgModule({
   declarations: [AppAdvertisingPage],
   imports: [
      IonicPageModule.forChild(AppAdvertisingPage),
      AdsClickDirectiveModule,
      LazyLoadDirectiveModule
   ]
})
export class AppAdvertisingPageModule { }
