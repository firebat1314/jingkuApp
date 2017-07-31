import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailErweimaPage } from './detail-erweima';
import { ImgLazyLoadDirectiveModule } from "../../../directives/img-lazy-load/img-lazy-load.module";
import { IonicImageViewerModule } from "ionic-img-viewer/dist/ionic-img-viewer";

@NgModule({
  declarations: [
    DetailErweimaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailErweimaPage),
    ImgLazyLoadDirectiveModule,
    IonicImageViewerModule,
  ],
  exports: [
    DetailErweimaPage
  ]
})
export class DetailErweimaPageModule { }
