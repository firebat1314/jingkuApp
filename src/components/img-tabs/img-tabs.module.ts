import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { ImgTabs } from "./img-tabs";

@NgModule({
  declarations: [
    ImgTabs,
  ],
  imports: [
    IonicModule
  ],
  exports: [
    ImgTabs
  ]
})
export class ImgTabsModule { }
