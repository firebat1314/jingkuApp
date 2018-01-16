import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailErweimaPage } from './detail-erweima';
import { ImgLazyLoadDirectiveModule } from "../../../directives/img-lazy-load/img-lazy-load.module";

@NgModule({
  declarations: [
    DetailErweimaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailErweimaPage),
    ImgLazyLoadDirectiveModule,
  ],
  exports: [
    DetailErweimaPage
  ]
})
export class DetailErweimaPageModule { }
