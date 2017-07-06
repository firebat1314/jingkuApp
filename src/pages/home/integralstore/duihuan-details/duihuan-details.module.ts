import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DuihuanDetailsPage } from "./duihuan-details";
import { ImgLazyLoadDirectiveModule } from "../../../../directives/img-lazy-load/img-lazy-load.module";
import { IonicImageViewerModule } from "ionic-img-viewer/dist/ionic-img-viewer";

@NgModule({
   declarations: [DuihuanDetailsPage],
   imports: [
      IonicImageViewerModule,
      IonicPageModule.forChild(DuihuanDetailsPage),
      ImgLazyLoadDirectiveModule,
   ]
})

export class DuihuanDetailsPageModule { }
