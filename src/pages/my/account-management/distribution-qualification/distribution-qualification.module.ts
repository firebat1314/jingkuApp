import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DistributionQualificationPage } from './distribution-qualification';
import { GetImageDirectiveModule } from '../../../../directives/get-image/get-image.module';
import { ImgLazyLoadDirectiveModule } from '../../../../directives/img-lazy-load/img-lazy-load.module';
import { CityPickerModule } from 'ionic2-city-picker/dist/city-picker.module';
import { OpenMoreDirectiveModule } from '../../../../directives/open-more/open-more.module';

@NgModule({
  declarations: [
    DistributionQualificationPage,
  ],
  imports: [
    IonicPageModule.forChild(DistributionQualificationPage),
    GetImageDirectiveModule,
    ImgLazyLoadDirectiveModule,
    CityPickerModule,
    OpenMoreDirectiveModule
  ],
})
export class DistributionQualificationPageModule {}
