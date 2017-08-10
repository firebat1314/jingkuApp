import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessmenNotePage } from "./businessmen-note";
import { ImgLazyLoadDirectiveModule } from "../../../../../directives/img-lazy-load/img-lazy-load.module";
@NgModule({
   declarations: [BusinessmenNotePage],
   imports: [
      IonicPageModule.forChild(BusinessmenNotePage),
      ImgLazyLoadDirectiveModule
   ]
})

export class BusinessmenNotePageModule { }