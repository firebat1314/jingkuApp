import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParticularsModalAttrPage } from "./particulars-modal-attr";
import { ImgLazyLoadDirectiveModule } from "../../../../directives/img-lazy-load/img-lazy-load.module";
import { CountInputComponentModule } from "../../../../components/count-input/count-input.module";
import { TofixedPipeModule } from "../../../../pipes/tofixed/tofixed.module";
import { PrefixPipeModule } from '../../../../pipes/prefix/prefix.module';

@NgModule({
   declarations: [
      ParticularsModalAttrPage,
   ],
   imports: [
      IonicPageModule.forChild(ParticularsModalAttrPage),
      ImgLazyLoadDirectiveModule,
      CountInputComponentModule,
      TofixedPipeModule,
      PrefixPipeModule
   ]
})

export class ParticularsModalAttrPageModule { }
