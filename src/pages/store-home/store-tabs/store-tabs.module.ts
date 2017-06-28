import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreTabsPage } from './store-tabs';
// import { StoreTabsHomePage } f rom '../store-tabs-home/store-tabs-home';

@NgModule({
  declarations: [
    StoreTabsPage,
    // StoreTabsHomePage,
  ],
  imports: [
    IonicPageModule.forChild(StoreTabsPage),
  ]
})
export class StoreTabsPageModule {}
