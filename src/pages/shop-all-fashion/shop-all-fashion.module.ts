import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopAllFashionPage } from './shop-all-fashion';

@NgModule({
  declarations: [
    // ShopAllFashionPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopAllFashionPage),
  ],
  exports: [
    // ShopAllFashionPage
  ]
})
export class ShopAllFashionPageModule {}
