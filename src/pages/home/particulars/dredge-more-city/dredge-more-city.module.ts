import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DredgeMoreCityPage } from "./dredge-more-city";

@NgModule({
   declarations: [
      DredgeMoreCityPage,
   ],
   imports: [
      IonicPageModule.forChild(DredgeMoreCityPage),
   ]
})

export class DredgeMoreCityPageModule { }
