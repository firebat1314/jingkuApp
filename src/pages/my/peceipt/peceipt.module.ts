import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PeceiptPage } from "./peceipt";

@NgModule({
  declarations: [PeceiptPage],
  imports: [
    IonicPageModule.forChild(PeceiptPage)
  ]
})

export class PeceiptPageModule { }