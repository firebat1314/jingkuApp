import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntegralstorePage } from "./integralstore";
import { ImgLazyLoadDirectiveModule } from "../../../directives/img-lazy-load/img-lazy-load.module";

@NgModule({
   declarations: [IntegralstorePage],
   imports: [
      IonicPageModule.forChild(IntegralstorePage),
      ImgLazyLoadDirectiveModule
   ]
})

export class IntegralstorePageModule { }
