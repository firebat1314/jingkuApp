import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseFramePage } from './choose-frame';
import { ImgLazyLoadDirectiveModule } from '../../../../directives/img-lazy-load/img-lazy-load.module';

@NgModule({
  declarations: [
    ChooseFramePage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseFramePage),
    ImgLazyLoadDirectiveModule
  ],
})
export class ChooseFramePageModule {}
