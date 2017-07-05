import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParticularsModalPage } from "./particulars-modal";
import { ImgLazyLoadDirectiveModule } from "../../../../directives/img-lazy-load/img-lazy-load.module";
import { MyCanvasComponentModule } from "../../../../components/my-canvas/my-canvas.module";

@NgModule({
   declarations: [
      ParticularsModalPage,
   ],
   imports: [
      IonicPageModule.forChild(ParticularsModalPage),
      ImgLazyLoadDirectiveModule,
      MyCanvasComponentModule
   ]
})

export class ParticularsModalPageModule { }
