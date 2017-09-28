import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImgLazyLoadDirectiveModule } from '../../../../../directives/img-lazy-load/img-lazy-load.module';
import { ChangePayPasswordPage } from './change-pay-password';
import { OpenGeeteDirectiveModule } from '../../../../../directives/open-geete/open-geete.module';

@NgModule({
   declarations: [
      ChangePayPasswordPage,
   ],
   imports: [
      IonicPageModule.forChild(ChangePayPasswordPage),
      ImgLazyLoadDirectiveModule,
      OpenGeeteDirectiveModule
   ],
   exports: [
      ChangePayPasswordPage
   ]
})
export class ChangePayPasswordPageModule { }
