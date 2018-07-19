import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EvaluationOverPage } from './evaluation-over';
import { ImgLazyLoadDirectiveModule } from '../../../../directives/img-lazy-load/img-lazy-load.module';

@NgModule({
  declarations: [
    EvaluationOverPage,
  ],
  imports: [
    IonicPageModule.forChild(EvaluationOverPage),
    ImgLazyLoadDirectiveModule,
  ],
})
export class EvaluationOverPageModule {}
