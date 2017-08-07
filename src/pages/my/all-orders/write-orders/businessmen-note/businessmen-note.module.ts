import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessmenNotePage } from "./businessmen-note";
@NgModule({
   declarations: [BusinessmenNotePage],
   imports: [
      IonicPageModule.forChild(BusinessmenNotePage)
   ]
})

export class BusinessmenNotePageModule { }