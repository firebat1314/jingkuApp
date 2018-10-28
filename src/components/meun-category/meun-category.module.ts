import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { MeunCategoryComponent } from './meun-category';

@NgModule({
   declarations: [
      MeunCategoryComponent,
   ],
   imports: [
      IonicModule
   ],
   exports: [
      MeunCategoryComponent
   ]
})
export class MeunCategoryComponentModule { }
