import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShareListPage } from './share-list';
import { ImgLazyLoadDirectiveModule } from '../../../directives/img-lazy-load/img-lazy-load.module';

@NgModule({
  declarations: [
    ShareListPage,
  ],
  imports: [
    IonicPageModule.forChild(ShareListPage),
    ImgLazyLoadDirectiveModule
  ],
})
export class ShareListPageModule {}
