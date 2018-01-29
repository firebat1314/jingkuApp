import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseLensLPage } from './choose-lens-l';
import { ImgLazyLoadDirectiveModule } from '../../../../directives/img-lazy-load/img-lazy-load.module';

@NgModule({
  declarations: [
    ChooseLensLPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseLensLPage),
    ImgLazyLoadDirectiveModule
  ],
})
export class ChooseLensLPageModule {}
