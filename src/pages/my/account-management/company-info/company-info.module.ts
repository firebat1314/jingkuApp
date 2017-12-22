import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyInfoPage } from './company-info';
import { GetImageDirectiveModule } from '../../../../directives/get-image/get-image.module';
import { ImgLazyLoadDirectiveModule } from '../../../../directives/img-lazy-load/img-lazy-load.module';
import { CityPickerModule } from 'ionic2-city-picker/dist/city-picker.module';
import { OpenMoreDirectiveModule } from '../../../../directives/open-more/open-more.module';

@NgModule({
  declarations: [
    CompanyInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyInfoPage),
    GetImageDirectiveModule,
    ImgLazyLoadDirectiveModule,
    CityPickerModule,
    OpenMoreDirectiveModule
  ],
})
export class CompanyInfoPageModule {}
