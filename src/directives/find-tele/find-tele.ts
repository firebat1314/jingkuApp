import { Directive, ElementRef, Renderer } from '@angular/core';

/**
 * Generated class for the FindTeleDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[find-tele]' // Attribute selector
})
export class FindTeleDirective {

  constructor(public element: ElementRef, public renderer: Renderer) {
    console.log('Hello FindTeleDirective Directive');
  }
  ngAfterViewInit(){
    let phoneRex = /(1[3-8]\d{9})(?!@|.*?\1)/gi;
    this.element.nativeElement.innerHTML = this.element.nativeElement.innerHTML.replace(phoneRex, '<a style="color:#3d7cca">$&</a>') 
  }
}
