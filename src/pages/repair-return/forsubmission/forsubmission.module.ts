import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { forsubmissionPage } from './forsubmission';
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';
import { OpenMoreDirectiveModule } from '../../../directives/open-more/open-more.module';
import { CountInputComponentModule } from "../../../components/count-input/count-input.module";
@NgModule({
  declarations: [
    forsubmissionPage,
  ],
  imports: [
    IonicPageModule.forChild(forsubmissionPage),
    ImgLazyLoadDirectiveModule,
    OpenMoreDirectiveModule,
    CountInputComponentModule
  ],
  exports: [
    forsubmissionPage
  ]
})
export class chooseaftersalegoodsPageModule {}
