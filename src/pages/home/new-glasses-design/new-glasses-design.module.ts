import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewGlassesDesignPage } from './new-glasses-design';
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';
import { AdsClickDirectiveModule } from '../../../directives/ads-click/ads-click.module';

@NgModule({
  declarations: [
    NewGlassesDesignPage,
  ],
  imports: [
    IonicPageModule.forChild(NewGlassesDesignPage),
    ImgLazyLoadDirectiveModule,
    AdsClickDirectiveModule,
  ],
})
export class NewGlassesDesignPageModule {}
