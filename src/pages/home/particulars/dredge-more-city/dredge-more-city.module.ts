import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DredgeMoreCityPage } from "./dredge-more-city";
import { GetImageDirectiveModule } from "../../../../directives/get-image/get-image.module";

@NgModule({
   declarations: [
      DredgeMoreCityPage,
   ],
   imports: [
      IonicPageModule.forChild(DredgeMoreCityPage),
      GetImageDirectiveModule
   ]
})

export class DredgeMoreCityPageModule { }
