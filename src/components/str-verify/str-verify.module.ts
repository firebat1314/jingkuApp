
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { StrVerifyComponent } from './str-verify';
import { ImgLazyLoadDirectiveModule } from '../../directives/img-lazy-load/img-lazy-load.module';

@NgModule({
   declarations: [StrVerifyComponent],
   imports: [IonicModule,ImgLazyLoadDirectiveModule],
   exports: [StrVerifyComponent]
})
export class StrVerifyComponentModule { }
