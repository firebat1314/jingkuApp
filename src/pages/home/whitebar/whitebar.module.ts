import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhitebarPage } from "./whitebar";

@NgModule({
  declarations: [WhitebarPage],
  imports: [
    IonicPageModule.forChild(WhitebarPage)
  ]
})

export class WhitebarPageModule { }