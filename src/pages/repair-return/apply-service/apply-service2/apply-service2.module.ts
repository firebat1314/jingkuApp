import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyService2Page } from './apply-service2';

@NgModule({
  declarations: [
    ApplyService2Page,
  ],
  imports: [
    IonicPageModule.forChild(ApplyService2Page),
  ],
  exports: [
    ApplyService2Page
  ]
})
export class ApplyService2PageModule {}
