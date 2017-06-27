import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreTabsHomePage } from './store-tabs-home';

@NgModule({
  declarations: [
    StoreTabsHomePage,
  ],
  imports: [
    IonicPageModule.forChild(StoreTabsHomePage),
  ],
  exports: [
    StoreTabsHomePage
  ]
})
export class StoreTabsHomePageModule {}
