import { Directive } from '@angular/core';

/*
  Generated class for the Countdown directive.

  See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/
@Directive({
  selector: '[countdown]' // Attribute selector
})
export class Countdown {

  constructor() {
    console.log('Hello Countdown Directive');
  }

}
