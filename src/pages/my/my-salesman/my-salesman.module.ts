import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MySalesmanPage } from './my-salesman';

@NgModule({
  declarations: [
    MySalesmanPage,
  ],
  imports: [
    IonicPageModule.forChild(MySalesmanPage),
  ],
  exports: [
    MySalesmanPage
  ]
})
export class MySalesmanPageModule {}
