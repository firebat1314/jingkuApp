import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdditionalDescriptionPage } from './additional-description';

@NgModule({
  declarations: [
    AdditionalDescriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(AdditionalDescriptionPage),
  ],
  exports: [
    AdditionalDescriptionPage
  ]
})
export class AdditionalDescriptionPageModule {}
