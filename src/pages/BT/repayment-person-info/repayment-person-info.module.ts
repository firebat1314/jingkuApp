import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepaymentPersonInfoPage } from './repayment-person-info';
import { CityPickerModule } from 'ionic2-city-picker/dist/city-picker.module';

@NgModule({
  declarations: [
    RepaymentPersonInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(RepaymentPersonInfoPage),
    CityPickerModule,
  ],
})
export class RepaymentPersonInfoPageModule {}
