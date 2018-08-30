import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseFramePage } from './choose-frame';
import { ImgLazyLoadDirectiveModule } from '../../../../directives/img-lazy-load/img-lazy-load.module';
import { AccountProcessProvider } from '../account-process-provider';

@NgModule({
  declarations: [
    ChooseFramePage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseFramePage),
    ImgLazyLoadDirectiveModule
  ],
  providers: [AccountProcessProvider]
})
export class ChooseFramePageModule {}
