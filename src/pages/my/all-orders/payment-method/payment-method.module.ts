import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentMethodPage } from "./payment-method";
import { PayPasswordComponentModule } from '../../../../components/pay-password/pay-password.module';

@NgModule({
  declarations: [PaymentMethodPage],
  imports: [
    IonicPageModule.forChild(PaymentMethodPage),
    PayPasswordComponentModule
  ]
})

export class PaymentMethodPageModule { }