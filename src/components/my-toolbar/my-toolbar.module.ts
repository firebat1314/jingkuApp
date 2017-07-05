import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MyToolbarComponent } from "./my-toolbar";

@NgModule({
  declarations: [
    MyToolbarComponent,
  ],
  imports: [
    IonicModule
  ],
  exports: [
    MyToolbarComponent
  ]
})
export class MyToolbarComponentModule { }
