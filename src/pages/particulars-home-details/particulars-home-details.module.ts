import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParticularsHomeDetailsPage } from './particulars-home-details';

@NgModule({
  declarations: [
    // ParticularsHomeDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ParticularsHomeDetailsPage),
  ],
  exports: [
    // ParticularsHomeDetailsPage
  ]
})
export class ParticularsHomeDetailsPageModule {}
