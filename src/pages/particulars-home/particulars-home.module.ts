import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParticularsHomePage } from './particulars-home';
import { ImgLazyLoadDirectiveModule } from "../../directives/img-lazy-load/img-lazy-load.module";
import { SingleFoodsItemComponentModule } from "../../components/single-foods-item/single-foods-item.module";
import { SingleCardComponentModule } from "../../components/single-card/single-card.module";
import { NoGoodsComponentModule } from "../../components/no-goods/no-goods.module";
import { OpenMoreDirectiveModule } from '../../directives/open-more/open-more.module';
import { ScrollToTopDirectiveModule } from '../../directives/scroll-to-top/scroll-to-top.module';

@NgModule({
  declarations: [
    ParticularsHomePage,
  ],
  imports: [
    IonicPageModule.forChild(ParticularsHomePage),
    ImgLazyLoadDirectiveModule,
    SingleFoodsItemComponentModule,
    SingleCardComponentModule,
    NoGoodsComponentModule,
    OpenMoreDirectiveModule,
    ScrollToTopDirectiveModule,
  ],
  exports: [
    ParticularsHomePage
  ]
})
export class ParticularsHomePageModule {}
