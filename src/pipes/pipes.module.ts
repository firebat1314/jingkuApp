import { NgModule } from '@angular/core';
import { FindTelePipe } from './find-tele/find-tele';
import { HideNamePipe } from './hide-name/hide-name';
import { KeysPipe } from './keys/keys';
@NgModule({
	declarations: [
      FindTelePipe,
      HideNamePipe,
      KeysPipe
   ],
	imports: [],
	exports: [
      FindTelePipe,
      HideNamePipe,
      KeysPipe
   ]
})
export class PipesModule { }
