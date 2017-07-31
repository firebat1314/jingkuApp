import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MyCanvasComponent } from './my-canvas';

@NgModule({
  declarations: [
    MyCanvasComponent,
  ],
  imports: [
    IonicModule
  ],
  exports: [
    MyCanvasComponent
  ]
})
export class MyCanvasComponentModule { }
