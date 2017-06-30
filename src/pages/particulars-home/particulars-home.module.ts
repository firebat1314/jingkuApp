import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParticularsHomePage } from './particulars-home';

@NgModule({
  declarations: [
    // ParticularsHomePage,
  ],
  imports: [
    IonicPageModule.forChild(ParticularsHomePage),
  ],
  exports: [
    // ParticularsHomePage
  ]
})
export class ParticularsHomePageModule {}
