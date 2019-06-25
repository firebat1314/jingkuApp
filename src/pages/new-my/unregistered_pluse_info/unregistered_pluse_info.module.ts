import { Component, ViewChild,NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { unregisteredPluseInfoPage } from "../unregistered_pluse_info/unregistered_pluse_info";
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';
import { OpenMoreDirectiveModule } from '../../../directives/open-more/open-more.module';

@NgModule({
  declarations: [
    unregisteredPluseInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(unregisteredPluseInfoPage),
    ImgLazyLoadDirectiveModule,
    OpenMoreDirectiveModule
  ],
  exports: [
    unregisteredPluseInfoPage
  ]
})
export class batchapplicationPageModule {}
