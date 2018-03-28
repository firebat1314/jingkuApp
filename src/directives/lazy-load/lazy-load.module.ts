import { NgModule } from '@angular/core';
import { LazyLoadDirective } from './lazy-load';

@NgModule({
   declarations: [LazyLoadDirective],
   exports: [LazyLoadDirective]
})

export class LazyLoadDirectiveModule { }
