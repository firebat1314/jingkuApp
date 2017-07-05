import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JifenHistoryPage } from "./jifen-history";

@NgModule({
   declarations: [JifenHistoryPage],
   imports: [
      IonicPageModule.forChild(JifenHistoryPage),
   ]
})

export class JifenHistoryPageModule { }
