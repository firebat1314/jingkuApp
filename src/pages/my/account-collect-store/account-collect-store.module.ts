import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountCollectStorePage } from "./account-collect-store";
import { ImgLazyLoadDirectiveModule } from "../../../directives/img-lazy-load/img-lazy-load.module";
import { NothingComponentModule } from "../../../components/nothing/nothing.module";

@NgModule({
  declarations: [AccountCollectStorePage],
  imports: [
    IonicPageModule.forChild(AccountCollectStorePage),
    ImgLazyLoadDirectiveModule,
    NothingComponentModule
  ]
})

export class AccountCollectStorePageModule { }