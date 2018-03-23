import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewProductPage } from './new-product';
import { AdsClickDirectiveModule } from '../../../directives/ads-click/ads-click.module';
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';

@NgModule({
  declarations: [
    NewProductPage,
  ],
  imports: [
    IonicPageModule.forChild(NewProductPage),
    ImgLazyLoadDirectiveModule,
    AdsClickDirectiveModule,
  ],
})
export class NewProductPageModule {}
