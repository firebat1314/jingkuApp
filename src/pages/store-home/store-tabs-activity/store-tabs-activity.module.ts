import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreTabsActivityPage } from './store-tabs-activity';

@NgModule({
  declarations: [
    StoreTabsActivityPage,
  ],
  imports: [
    IonicPageModule.forChild(StoreTabsActivityPage),
  ],
  exports: [
    StoreTabsActivityPage
  ]
})
export class StoreTabsActivityPageModule {}
