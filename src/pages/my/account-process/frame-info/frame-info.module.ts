import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FrameInfoPage } from './frame-info';

@NgModule({
  declarations: [
    FrameInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(FrameInfoPage),
  ],
})
export class FrameInfoPageModule {}
