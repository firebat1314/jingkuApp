import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParticularsHomeDetailsPage } from './particulars-home-details';
import { ImgLazyLoadDirectiveModule } from "../../../directives/img-lazy-load/img-lazy-load.module";
import { OpenMoreDirectiveModule } from '../../../directives/open-more/open-more.module';

@NgModule({
  declarations: [
    ParticularsHomeDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ParticularsHomeDetailsPage),
    ImgLazyLoadDirectiveModule,
    OpenMoreDirectiveModule
  ],
  exports: [
    ParticularsHomeDetailsPage
  ]
})
export class ParticularsHomeDetailsPageModule {}