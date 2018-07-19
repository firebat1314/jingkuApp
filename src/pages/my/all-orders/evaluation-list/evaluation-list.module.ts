import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EvaluationListPage } from './evaluation-list';
import { ImgLazyLoadDirectiveModule } from '../../../../directives/img-lazy-load/img-lazy-load.module';
import { NothingComponentModule } from '../../../../components/nothing/nothing.module';
import { ScrollToTopDirectiveModule } from '../../../../directives/scroll-to-top/scroll-to-top.module';

@NgModule({
  declarations: [
    EvaluationListPage,
  ],
  imports: [
    IonicPageModule.forChild(EvaluationListPage),
    ImgLazyLoadDirectiveModule,
    NothingComponentModule,
    ScrollToTopDirectiveModule
   ],
})
export class EvaluationListPageModule {}
