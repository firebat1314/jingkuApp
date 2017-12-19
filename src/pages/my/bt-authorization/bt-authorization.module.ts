import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BtAuthorizationPage } from './bt-authorization';

@NgModule({
  declarations: [
    BtAuthorizationPage,
  ],
  imports: [
    IonicPageModule.forChild(BtAuthorizationPage),
  ],
})
export class BtAuthorizationPageModule {}
