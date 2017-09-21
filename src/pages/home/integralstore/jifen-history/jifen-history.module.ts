import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JifenHistoryPage } from "./jifen-history";
import { ScrollToTopDirectiveModule } from '../../../../directives/scroll-to-top/scroll-to-top.module';

@NgModule({
   declarations: [JifenHistoryPage],
   imports: [
      IonicPageModule.forChild(JifenHistoryPage),
      ScrollToTopDirectiveModule
   ]
})

export class JifenHistoryPageModule { }
