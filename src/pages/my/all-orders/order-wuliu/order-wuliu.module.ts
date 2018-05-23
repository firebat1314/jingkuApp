import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderWuliuPage } from "./order-wuliu";
import { ReversePipeModule } from '../../../../pipes/reverse/reverse.module';
import { PipesModule } from '../../../../pipes/pipes.module';
import { DirectivesModule } from '../../../../directives/directives.module';
import { BypassSecurityTrustHtmlPipeModule } from '../../../../pipes/bypass-security-trust-html/bypass-security-trust-html.module';

@NgModule({
   declarations: [OrderWuliuPage],
   imports: [
      IonicPageModule.forChild(OrderWuliuPage),
      ReversePipeModule,
      DirectivesModule,
      PipesModule,
      BypassSecurityTrustHtmlPipeModule
   ]
})

export class OrderWuliuPageModule { }