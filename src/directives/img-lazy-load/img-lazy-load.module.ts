import { NgModule } from '@angular/core';
import { ImgLazyLoadDirective } from "./img-lazy-load";

@NgModule({
   declarations: [ImgLazyLoadDirective],
   exports: [ImgLazyLoadDirective]
})

export class ImgLazyLoadDirectiveModule { }
