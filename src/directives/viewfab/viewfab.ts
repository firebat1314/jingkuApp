import { Directive, ViewChild } from '@angular/core';
import { Content, FabButton } from "ionic-angular";

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

  @ViewChild(Content) mycontent:Content
  @ViewChild(FabButton) fabButton: FabButton;

  constructor() {
    console.log('Hello ViewfabDirective Directive');
  }
  ngAfterViewInit() {
    console.log(this.mycontent)
    console.log(this.fabButton)
  }
}
