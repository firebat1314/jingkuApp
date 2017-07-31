import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttentionPage } from "./attention";

@NgModule({
  declarations: [AttentionPage],
  imports: [
    IonicPageModule.forChild(AttentionPage)
  ]
})

export class AttentionPageModule { }