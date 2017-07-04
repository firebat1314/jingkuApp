import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailErweimaPage } from './detail-erweima';

@NgModule({
  declarations: [
    DetailErweimaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailErweimaPage),
  ],
  exports: [
    DetailErweimaPage
  ]
})
export class DetailErweimaPageModule {}
