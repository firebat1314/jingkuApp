import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrandListPage } from "./brand-list";
import { SingleFoodsItemComponentModule } from "../../../components/single-foods-item/single-foods-item.module";
import { SingleCardComponentModule } from "../../../components/single-card/single-card.module";

@NgModule({
  declarations: [BrandListPage],
  imports: [
    IonicPageModule.forChild(BrandListPage),
    SingleCardComponentModule,
    SingleFoodsItemComponentModule
  ]
})

export class BrandListPageModule { }