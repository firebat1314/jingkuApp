import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceOrderDetailsPage } from './service-order-details';
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';
import { OpenMoreDirectiveModule } from '../../../directives/open-more/open-more.module';

@NgModule({
  declarations: [
    ServiceOrderDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceOrderDetailsPage),
    ImgLazyLoadDirectiveModule,
    OpenMoreDirectiveModule
  ],
  exports: [
    ServiceOrderDetailsPage
  ]
})
export class ServiceOrderDetailsPageModule {}
