import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowSpecialPage } from './show-special';
import { ImgLazyLoadDirectiveModule } from '../../../../directives/img-lazy-load/img-lazy-load.module';
import { AdsClickDirectiveModule } from '../../../../directives/ads-click/ads-click.module';

@NgModule({
  declarations: [
    ShowSpecialPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowSpecialPage),
    AdsClickDirectiveModule,
    ImgLazyLoadDirectiveModule,
  ],
})
export class ShowSpecialPageModule {}
