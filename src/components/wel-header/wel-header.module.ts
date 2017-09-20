import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { WelHeaderComponent } from './wel-header';
import { OpenMoreDirectiveModule } from '../../directives/open-more/open-more.module';

@NgModule({
  declarations: [
    WelHeaderComponent,
  ],
  imports: [
    IonicModule,
    OpenMoreDirectiveModule
  ],
  exports: [
    WelHeaderComponent
  ]
})
export class WelHeaderComponentModule { }
