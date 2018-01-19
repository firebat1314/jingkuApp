import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelperDetailsPage } from "./helper-details";
import { ScrollToTopDirectiveModule } from '../../../../directives/scroll-to-top/scroll-to-top.module';
import { BypassSecurityTrustHtmlPipeModule } from '../../../../pipes/bypass-security-trust-html/bypass-security-trust-html.module';

@NgModule({
  declarations: [HelperDetailsPage],
  imports: [
    IonicPageModule.forChild(HelperDetailsPage),
    ScrollToTopDirectiveModule,
    BypassSecurityTrustHtmlPipeModule
  ]
})

export class HelperDetailsPageModule { }