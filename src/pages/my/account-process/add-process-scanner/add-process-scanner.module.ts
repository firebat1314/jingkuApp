import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddProcessScannerPage } from './add-process-scanner';
import { ScrollToTopDirectiveModule } from '../../../../directives/scroll-to-top/scroll-to-top.module';
import { ImgLazyLoadDirectiveModule } from '../../../../directives/img-lazy-load/img-lazy-load.module';
import { AccountProcessProvider } from '../account-process-provider';

@NgModule({
   declarations: [AddProcessScannerPage],
   imports: [
      IonicPageModule.forChild(AddProcessScannerPage),
      ScrollToTopDirectiveModule,
      ImgLazyLoadDirectiveModule
   ],
   providers: [AccountProcessProvider]
})

export class AddProcessScannerPageModule { }