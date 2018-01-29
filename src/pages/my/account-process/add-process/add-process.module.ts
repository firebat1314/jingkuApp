import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddProcessPage } from './add-process';
import { ScrollToTopDirectiveModule } from '../../../../directives/scroll-to-top/scroll-to-top.module';
import { ImgLazyLoadDirectiveModule } from '../../../../directives/img-lazy-load/img-lazy-load.module';

@NgModule({
  declarations: [AddProcessPage],
  imports: [
    IonicPageModule.forChild(AddProcessPage),
    ScrollToTopDirectiveModule,
    ImgLazyLoadDirectiveModule
  ]
})

export class AddProcessPageModule { }