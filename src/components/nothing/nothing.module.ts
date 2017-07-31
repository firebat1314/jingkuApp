import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NothingComponent } from "./nothing";

@NgModule({
  declarations: [
    NothingComponent,
  ],
  imports: [
    IonicModule
  ],
  exports: [
    NothingComponent
  ]
})
export class NothingComponentModule { }
