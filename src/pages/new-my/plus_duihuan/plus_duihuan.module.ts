import { Component, ViewChild,NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { plus_duihuanPage } from "../plus_duihuan/plus_duihuan";
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';
import { OpenMoreDirectiveModule } from '../../../directives/open-more/open-more.module';

@NgModule({
  declarations: [
    plus_duihuanPage,
  ],
  imports: [
    IonicPageModule.forChild(plus_duihuanPage),
    ImgLazyLoadDirectiveModule,
    OpenMoreDirectiveModule
  ],
  exports: [
    plus_duihuanPage
  ]
})
export class batchapplicationPageModule {}
