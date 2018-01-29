import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseLensRPage } from './choose-lens-r';
import { ImgLazyLoadDirectiveModule } from '../../../../directives/img-lazy-load/img-lazy-load.module';

@NgModule({
  declarations: [
    ChooseLensRPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseLensRPage),
    ImgLazyLoadDirectiveModule
  ],
})
export class ChooseLensRPageModule {}
