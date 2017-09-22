import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImgLazyLoadDirectiveModule } from '../../../../../directives/img-lazy-load/img-lazy-load.module';
import { ChangePayPasswordPage } from './change-pay-password';

@NgModule({
   declarations: [
      ChangePayPasswordPage,
   ],
   imports: [
      IonicPageModule.forChild(ChangePayPasswordPage),
      ImgLazyLoadDirectiveModule
   ],
   exports: [
      ChangePayPasswordPage
   ]
})
export class ChangePayPasswordPageModule { }
