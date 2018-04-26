import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnyLinkPage } from './any-link';

@NgModule({
  declarations: [AnyLinkPage],
  imports: [
    IonicPageModule.forChild(AnyLinkPage)
  ]
})

export class AnyLinkPageModule { }