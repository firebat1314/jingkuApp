import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepairReturnPage } from './repair-return';
import { ImgLazyLoadDirectiveModule } from "../../directives/img-lazy-load/img-lazy-load.module";
import { ScrollToTopDirectiveModule } from '../../directives/scroll-to-top/scroll-to-top.module';

@NgModule({
  declarations: [
    RepairReturnPage,
  ],
  imports: [
    IonicPageModule.forChild(RepairReturnPage),
    ImgLazyLoadDirectiveModule,
    ScrollToTopDirectiveModule,
  ],
  exports: [
    RepairReturnPage
  ]
})
export class RepairReturnPageModule {}
