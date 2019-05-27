import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { chooseaftersalegoodsPage } from './chooseaftersalegoods';
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';
import { OpenMoreDirectiveModule } from '../../../directives/open-more/open-more.module';
import { CountInputComponentModule } from "../../../components/count-input/count-input.module";
@NgModule({
  declarations: [
    chooseaftersalegoodsPage,
  ],
  imports: [
    IonicPageModule.forChild(chooseaftersalegoodsPage),
    ImgLazyLoadDirectiveModule,
    OpenMoreDirectiveModule,
    CountInputComponentModule
  ],
  exports: [
    chooseaftersalegoodsPage
  ]
})
export class chooseaftersalegoodsPageModule {}
