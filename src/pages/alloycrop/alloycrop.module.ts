import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlloycropPage } from './alloycrop';

@NgModule({
  declarations: [
    AlloycropPage,
  ],
  imports: [
    IonicPageModule.forChild(AlloycropPage),
  ],
})
export class AlloycropPageModule {}
