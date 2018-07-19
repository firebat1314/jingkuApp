import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EvaluationPage } from './evaluation';
import { Ionic2RatingModule } from 'ionic2-rating';
import { GetImageDirectiveModule } from '../../../../directives/get-image/get-image.module';
import { ImgLazyLoadDirectiveModule } from '../../../../directives/img-lazy-load/img-lazy-load.module';

@NgModule({
  declarations: [
    EvaluationPage,
  ],
  imports: [
    IonicPageModule.forChild(EvaluationPage),
    Ionic2RatingModule,
    GetImageDirectiveModule,
    ImgLazyLoadDirectiveModule
  ],
})
export class EvaluationPageModule {}
