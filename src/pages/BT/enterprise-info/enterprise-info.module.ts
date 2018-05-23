import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnterpriseInfoPage } from './enterprise-info';
import { CityPickerModule } from 'ionic2-city-picker/dist/city-picker.module';

@NgModule({
  declarations: [
    EnterpriseInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(EnterpriseInfoPage),
    CityPickerModule,
  ],
})
export class EnterpriseInfoPageModule {}
