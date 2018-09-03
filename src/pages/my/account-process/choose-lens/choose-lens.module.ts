import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseLensPage } from './choose-lens';
import { ImgLazyLoadDirectiveModule } from '../../../../directives/img-lazy-load/img-lazy-load.module';
import { AccountProcessProvider } from '../account-process-provider';

@NgModule({
   declarations: [
      ChooseLensPage,
   ],
   imports: [
      IonicPageModule.forChild(ChooseLensPage),
      ImgLazyLoadDirectiveModule
   ],
   providers: [AccountProcessProvider]
})
export class ChooseLensPageModule { }
