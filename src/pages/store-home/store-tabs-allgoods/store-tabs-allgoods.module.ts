import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreTabsAllgoodsPage } from './store-tabs-allgoods';

@NgModule({
  declarations: [
    StoreTabsAllgoodsPage,
  ],
  imports: [
    IonicPageModule.forChild(StoreTabsAllgoodsPage),
  ],
  exports: [
    StoreTabsAllgoodsPage
  ]
})
export class StoreTabsAllgoodsPageModule {}
