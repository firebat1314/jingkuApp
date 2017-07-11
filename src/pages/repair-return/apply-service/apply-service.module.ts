import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyServicePage } from './apply-service';
import { ImgLazyLoadDirectiveModule } from "../../../directives/img-lazy-load/img-lazy-load.module";
import { CountInputComponentModule } from "../../../components/count-input/count-input.module";

@NgModule({
  declarations: [
    ApplyServicePage,
  ],
  imports: [
    IonicPageModule.forChild(ApplyServicePage),
    ImgLazyLoadDirectiveModule,
    CountInputComponentModule
  ],
  exports: [
    ApplyServicePage
  ]
})
export class ApplyServicePageModule {}
