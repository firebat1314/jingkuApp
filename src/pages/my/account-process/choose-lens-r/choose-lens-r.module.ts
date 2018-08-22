import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseLensRPage } from './choose-lens-r';
import { ImgLazyLoadDirectiveModule } from '../../../../directives/img-lazy-load/img-lazy-load.module';
import { AccountProcessProvider } from '../account-process-provider';

@NgModule({
  declarations: [
    ChooseLensRPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseLensRPage),
    ImgLazyLoadDirectiveModule
  ],
  providers: [AccountProcessProvider]
})
export class ChooseLensRPageModule {}
