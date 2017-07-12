import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceOrderDetailsPage } from './service-order-details';

@NgModule({
  declarations: [
    ServiceOrderDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceOrderDetailsPage),
  ],
  exports: [
    ServiceOrderDetailsPage
  ]
})
export class ServiceOrderDetailsPageModule {}
