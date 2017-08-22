import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IframeBrowserPage } from "./iframe-browser";

@NgModule({
   declarations: [
      IframeBrowserPage,
   ],
   imports: [
      IonicPageModule.forChild(IframeBrowserPage),
   ],
   exports: [
      IframeBrowserPage
   ]
})
export class IframeBrowserPageModule { }
