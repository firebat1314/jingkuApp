import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { photoplayPage } from './photoplay';
import { OpenMoreDirectiveModule } from '../../../../directives/open-more/open-more.module';
import { PhoneNumberFilterModule } from '../../../../pipes/phone-number-fiter/phone-number-fiter.module';
import { ImgLazyLoadDirectiveModule } from '../../../../directives/img-lazy-load/img-lazy-load.module';
import { GetImageDirectiveModule } from '../../../../directives/get-image/get-image.module';
import { CityPickerModule } from 'ionic2-city-picker/dist/city-picker.module';
// import { EvaluationPage } from './evaluation';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    photoplayPage,
  ],
  imports: [
    IonicPageModule.forChild(photoplayPage),
    GetImageDirectiveModule,
    ImgLazyLoadDirectiveModule,
    OpenMoreDirectiveModule,
    PhoneNumberFilterModule,
    CityPickerModule,
    Ionic2RatingModule,
  ],
})
export class photoplayPageModule {}

