import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CountdownComponent } from "./countdown";

@NgModule({
   declarations: [CountdownComponent],
   imports: [IonicModule],
   exports: [CountdownComponent]
})
export class CountdownComponentModule { }
