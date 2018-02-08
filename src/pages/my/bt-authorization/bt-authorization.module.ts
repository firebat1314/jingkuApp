import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BtAuthorizationPage } from './bt-authorization';
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';

@NgModule({
  declarations: [
    BtAuthorizationPage,
  ],
  imports: [
    IonicPageModule.forChild(BtAuthorizationPage),
    ImgLazyLoadDirectiveModule
  ],
})
export class BtAuthorizationPageModule {}
