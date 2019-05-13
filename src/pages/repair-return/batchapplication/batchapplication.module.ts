import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { batchapplicationPage } from './batchapplication';
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';
import { OpenMoreDirectiveModule } from '../../../directives/open-more/open-more.module';

@NgModule({
  declarations: [
    batchapplicationPage,
  ],
  imports: [
    IonicPageModule.forChild(batchapplicationPage),
    ImgLazyLoadDirectiveModule,
    OpenMoreDirectiveModule
  ],
  exports: [
    batchapplicationPage
  ]
})
export class batchapplicationPageModule {}
