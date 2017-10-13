import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewMyPage } from './new-my';
import { ImgLazyLoadDirectiveModule } from '../../directives/img-lazy-load/img-lazy-load.module';

@NgModule({
   declarations: [
      NewMyPage,
   ],
   imports: [
      IonicPageModule.forChild(NewMyPage),
      ImgLazyLoadDirectiveModule
   ],
   exports: [
      NewMyPage
   ]
})
export class NewMyPageModule { }
