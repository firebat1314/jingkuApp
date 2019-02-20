import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharePage } from './share';
import { QRCodeModule } from 'angular2-qrcode';
@NgModule({
  declarations: [
    SharePage,
  ],
  imports: [
    IonicPageModule.forChild(SharePage),
    QRCodeModule
  ],
})
export class SharePageModule {}
