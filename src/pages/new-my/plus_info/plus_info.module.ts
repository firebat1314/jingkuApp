import { Component, ViewChild,NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { plusInfoPage } from "../plus_info/plus_info";
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';
import { OpenMoreDirectiveModule } from '../../../directives/open-more/open-more.module';

@NgModule({
  declarations: [
    plusInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(plusInfoPage),
    ImgLazyLoadDirectiveModule,
    OpenMoreDirectiveModule
  ],
  exports: [
    plusInfoPage
  ]
})
export class plusinfoPageModule {

}
