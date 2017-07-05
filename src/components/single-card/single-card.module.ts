import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SingleCardComponent } from "./single-card";
import { ImgLazyLoadDirectiveModule } from "../../directives/img-lazy-load/img-lazy-load.module";

@NgModule({
  declarations: [
    SingleCardComponent,
  ],
  imports: [
    IonicModule,
    ImgLazyLoadDirectiveModule
  ],
  exports: [
    SingleCardComponent
  ]
})
export class SingleCardComponentModule { }
