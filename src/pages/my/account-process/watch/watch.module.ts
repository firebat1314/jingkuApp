import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WatchPage } from './watch';
import { ImgLazyLoadDirectiveModule } from '../../../../directives/img-lazy-load/img-lazy-load.module';
import { ScrollToTopDirectiveModule } from '../../../../directives/scroll-to-top/scroll-to-top.module';

@NgModule({
  declarations: [WatchPage],
  imports: [
    IonicPageModule.forChild(WatchPage),
    ImgLazyLoadDirectiveModule,
    ScrollToTopDirectiveModule
  ],
  exports: [WatchPage]
})

export class WatchPageModule { }