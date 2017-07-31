import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WriteCourierNumberPage } from './write-courier-number';

@NgModule({
  declarations: [
    WriteCourierNumberPage,
  ],
  imports: [
    IonicPageModule.forChild(WriteCourierNumberPage),
  ],
  exports: [
    WriteCourierNumberPage
  ]
})
export class WriteCourierNumberPageModule {}
