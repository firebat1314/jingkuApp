import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgreementPage } from './agreement';
import { BypassSecurityTrustHtmlPipeModule } from '../../../pipes/bypass-security-trust-html/bypass-security-trust-html.module';

@NgModule({
  declarations: [
    AgreementPage,
  ],
  imports: [
    IonicPageModule.forChild(AgreementPage),
    BypassSecurityTrustHtmlPipeModule
  ],
})
export class AgreementPageModule {}
