import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarPage } from "./car";
import { CountInputComponentModule } from "../../components/count-input/count-input.module";
import { ImgLazyLoadDirectiveModule } from "../../directives/img-lazy-load/img-lazy-load.module";
import { NothingComponentModule } from "../../components/nothing/nothing.module";
import { TofixedPipeModule } from "../../pipes/tofixed/tofixed.module";
@NgModule({
   declarations: [CarPage],
   imports: [
      CountInputComponentModule,
      IonicPageModule.forChild(CarPage),
      ImgLazyLoadDirectiveModule,
      NothingComponentModule,
      TofixedPipeModule
   ]
})
export class HomePageModule { }
