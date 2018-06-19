import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IframeBrowserPage } from "./iframe-browser";
import { OpenMoreDirectiveModule } from '../../directives/open-more/open-more.module';

@NgModule({
   declarations: [
      IframeBrowserPage,
   ],
   imports: [
      IonicPageModule.forChild(IframeBrowserPage),
      OpenMoreDirectiveModule,
   ],
   exports: [
      IframeBrowserPage
   ]
})
export class IframeBrowserPageModule { }
