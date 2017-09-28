import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WatchPage } from './watch';
import { ImgLazyLoadDirectiveModule } from '../../../../directives/img-lazy-load/img-lazy-load.module';

@NgModule({
  declarations: [WatchPage],
  imports: [
    IonicPageModule.forChild(WatchPage),
    ImgLazyLoadDirectiveModule
  ],
  exports: [WatchPage]
})

export class WatchPageModule { }