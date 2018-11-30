import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomeServicesPage } from './custome-services';
import { BypassSecurityTrustHtmlPipeModule } from '../../pipes/bypass-security-trust-html/bypass-security-trust-html.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ImgLazyLoadDirectiveModule } from '../../directives/img-lazy-load/img-lazy-load.module';

@NgModule({
   declarations: [
      CustomeServicesPage,
   ],
   imports: [
      IonicPageModule.forChild(CustomeServicesPage),
      BypassSecurityTrustHtmlPipeModule,
      ImgLazyLoadDirectiveModule,
      PipesModule,
   ],
})
export class CustomeServicesPageModule { }
