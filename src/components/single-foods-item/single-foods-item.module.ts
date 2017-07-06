import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SingleFoodsItemComponent } from "./single-foods-item";
import { ImgLazyLoadDirectiveModule } from "../../directives/img-lazy-load/img-lazy-load.module";

@NgModule({
  declarations: [
    SingleFoodsItemComponent,
  ],
  imports: [
    IonicModule,
    ImgLazyLoadDirectiveModule
  ],
  exports: [
    SingleFoodsItemComponent
  ]
})
export class SingleFoodsItemComponentModule { }
