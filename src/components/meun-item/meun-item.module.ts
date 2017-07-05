import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { MeunItemComponent } from "./meun-item";

@NgModule({
   declarations: [
      MeunItemComponent,
   ],
   imports: [
      IonicModule
   ],
   exports: [
      MeunItemComponent
   ]
})
export class MeunItemComponentModule { }
