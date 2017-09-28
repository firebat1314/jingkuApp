import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverMachiningPage } from './popover-machining';
import { ImgLazyLoadDirectiveModule } from '../../../../directives/img-lazy-load/img-lazy-load.module';

@NgModule({
  declarations: [
    PopoverMachiningPage,
  ],
  imports: [
    IonicPageModule.forChild(PopoverMachiningPage),
    ImgLazyLoadDirectiveModule,
  ],
  exports: [
    PopoverMachiningPage
  ]
})
export class PopoverMachiningPageModule {}
