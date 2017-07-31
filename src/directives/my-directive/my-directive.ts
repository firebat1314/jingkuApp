import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';

/*
  Generated class for the MyDirective directive.

  See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/
@Directive({
  selector: '[myHighlight]' // Attribute selector
})
export class MyDirective {

  private _defaultColor = 'red';

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input() set defaultColor(colorName: string) {
    this._defaultColor = colorName || this._defaultColor;
  }
  @Input('myHighlight') highlightColor: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || this._defaultColor);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', color);
    // console.log(this.renderer,this.el.nativeElement)
  }
}
