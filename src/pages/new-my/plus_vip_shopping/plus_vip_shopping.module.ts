import { NgModule, Component, ViewChild,} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { plusVipShoppingPage } from '../plus_vip_shopping/plus_vip_shopping';
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';
@NgModule({
   declarations: [
      plusVipShoppingPage,
   ],
   imports: [
      IonicPageModule.forChild(plusVipShoppingPage),
      ImgLazyLoadDirectiveModule
   ],
   exports: [
      plusVipShoppingPage
   ]
})
export class NewMyPageModule { }
