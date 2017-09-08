import { NgModule } from '@angular/core';
import { ReversePipe } from './reverse';

@NgModule({
  declarations: [ReversePipe],
  exports: [ReversePipe]
})
export class ReversePipeModule { }
