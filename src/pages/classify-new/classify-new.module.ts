import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImgLazyLoadDirectiveModule } from '../../directives/img-lazy-load/img-lazy-load.module';
import { ClassifyNewPage } from './classify-new';
import { ScrollToTopDirectiveModule } from '../../directives/scroll-to-top/scroll-to-top.module';

@NgModule({
  declarations: [
    ClassifyNewPage,
  ],
  imports: [
    IonicPageModule.forChild(ClassifyNewPage),
    ImgLazyLoadDirectiveModule,
    ScrollToTopDirectiveModule
  ],
  exports: [
    ClassifyNewPage
  ]
})
export class ClassifyNewPageModule {}
