import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImgLazyLoadDirectiveModule } from "../../directives/img-lazy-load/img-lazy-load.module";
import { WellcomeNewmPage } from "./wellcome-newm";

@NgModule({
   declarations: [
      WellcomeNewmPage,
   ],
   imports: [
      IonicPageModule.forChild(WellcomeNewmPage),
      ImgLazyLoadDirectiveModule
   ],
   exports: [
      WellcomeNewmPage
   ]
})
export class WellcomeNewmPageModule { }
