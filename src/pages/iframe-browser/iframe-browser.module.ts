import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IframeBrowserPage } from "./iframe-browser";
import { OpenMoreDirectiveModule } from '../../directives/open-more/open-more.module';
import { BypassSecurityTrustResourceurlPipeModule } from '../../pipes/bypass-security-trust-resourceurl/bypass-security-trust-resourceurl.module';

@NgModule({
   declarations: [
      IframeBrowserPage,
   ],
   imports: [
      IonicPageModule.forChild(IframeBrowserPage),
      OpenMoreDirectiveModule,
      BypassSecurityTrustResourceurlPipeModule
   ],
   exports: [
      IframeBrowserPage
   ]
})
export class IframeBrowserPageModule { }
