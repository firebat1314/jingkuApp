import { NgModule } from '@angular/core';
import { FindTelePipe } from './find-tele/find-tele';
import { HideNamePipe } from './hide-name/hide-name';
@NgModule({
	declarations: [
      FindTelePipe,
      HideNamePipe
   ],
	imports: [],
	exports: [
      FindTelePipe,
      HideNamePipe
   ]
})
export class PipesModule { }
