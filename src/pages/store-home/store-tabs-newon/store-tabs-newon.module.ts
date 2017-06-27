import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreTabsNewonPage } from './store-tabs-newon';

@NgModule({
  declarations: [
    StoreTabsNewonPage,
  ],
  imports: [
    IonicPageModule.forChild(StoreTabsNewonPage),
  ],
  exports: [
    StoreTabsNewonPage
  ]
})
export class StoreTabsNewonPageModule {}
