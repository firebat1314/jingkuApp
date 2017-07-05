import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParticularsHomePage } from './particulars-home';
import { ImgLazyLoadDirectiveModule } from "../../directives/img-lazy-load/img-lazy-load.module";

@NgModule({
  declarations: [
    ParticularsHomePage,
  ],
  imports: [
    IonicPageModule.forChild(ParticularsHomePage),
    ImgLazyLoadDirectiveModule
  ],
  exports: [
    ParticularsHomePage
  ]
})
export class ParticularsHomePageModule {}
