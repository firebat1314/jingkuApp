import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CountInputComponent } from "./count-input";

@NgModule({
   declarations: [CountInputComponent],
   imports: [IonicModule],
   exports: [CountInputComponent]
})
export class CountInputComponentModule { }
