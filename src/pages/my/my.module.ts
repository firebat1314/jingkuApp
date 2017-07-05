import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPage } from "./my";
import { ImgLazyLoadDirectiveModule } from "../../directives/img-lazy-load/img-lazy-load.module";

@NgModule({
   declarations: [MyPage],
   imports: [
      IonicPageModule.forChild(MyPage),
      ImgLazyLoadDirectiveModule,
   ]
})

export class MyPageModule { }
