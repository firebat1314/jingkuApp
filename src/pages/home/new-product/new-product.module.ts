import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';
import { AdsClickDirectiveModule } from '../../../directives/ads-click/ads-click.module';
import { NewProductPage } from './new-product';

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
