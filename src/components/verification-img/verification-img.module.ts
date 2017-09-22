import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { VerificationImgComponent } from './verification-img';
import { ImgLazyLoadDirectiveModule } from '../../directives/img-lazy-load/img-lazy-load.module';

@NgModule({
  declarations: [
    VerificationImgComponent,
  ],
  imports: [
    IonicModule,
    ImgLazyLoadDirectiveModule
  ],
  exports: [
    VerificationImgComponent
  ]
})
export class VerificationImgComponentModule { }
