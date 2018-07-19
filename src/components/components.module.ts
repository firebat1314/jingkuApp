import { NgModule } from '@angular/core';
import { RatingStarsComponent } from './rating-stars/rating-stars';
import { IonicModule } from 'ionic-angular';
@NgModule({
   declarations: [
      RatingStarsComponent
   ],
   imports: [
      IonicModule
   ],
   exports: [
      RatingStarsComponent
   ]
})
export class ComponentsModule { }
