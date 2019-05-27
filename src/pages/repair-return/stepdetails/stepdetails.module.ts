import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { stepdetailsPage } from './stepdetails';
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';
import { OpenMoreDirectiveModule } from '../../../directives/open-more/open-more.module';
import { CountInputComponentModule } from "../../../components/count-input/count-input.module";
import { CityPickerModule } from "ionic2-city-picker/dist/city-picker.module";
@NgModule({
  declarations: [
    stepdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(stepdetailsPage),
    ImgLazyLoadDirectiveModule,
    OpenMoreDirectiveModule,
    CountInputComponentModule,
    CityPickerModule
  ],
  exports: [
    stepdetailsPage
  ]
})
export class stepdetailsPageModule {}
