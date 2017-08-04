import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageDetailsPage } from "./message-details";
import { ImgLazyLoadDirectiveModule } from "../../../../directives/img-lazy-load/img-lazy-load.module";

@NgModule({
   declarations: [MessageDetailsPage],
   imports: [
      IonicPageModule.forChild(MessageDetailsPage),
      ImgLazyLoadDirectiveModule,
   ]
})

export class MessageDetailsPageModule { }
