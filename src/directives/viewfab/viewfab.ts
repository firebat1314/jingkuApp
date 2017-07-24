import { Directive, ViewChild } from '@angular/core';

/**
 * Generated class for the ViewfabDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[viewfab]' // Attribute selector
})
export class ViewfabDirective {

  
  constructor() {
    console.log('Hello ViewfabDirective Directive');
  }
  
}
