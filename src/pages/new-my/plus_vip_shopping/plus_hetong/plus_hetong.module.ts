import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { plushetongPage } from '../plus_hetong/plus_hetong';
import { ImgLazyLoadDirectiveModule } from '../../../../directives/img-lazy-load/img-lazy-load.module';
@NgModule({
   declarations: [
      plushetongPage,
   ],
   imports: [
      IonicPageModule.forChild(plushetongPage),
      ImgLazyLoadDirectiveModule
   ],
   exports: [
      plushetongPage
   ]
})
export class NewMyPageModule { }
