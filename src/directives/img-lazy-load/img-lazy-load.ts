import { Directive, ElementRef, Renderer, Input } from '@angular/core';

/**
 * Generated class for the ImgLazyLoadDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[img-lazy-load]' // Attribute selector
})
export class ImgLazyLoadDirective {

  private _defaultSrc = './assets/images/images/logo.jpg';

  constructor(public element: ElementRef, public renderer: Renderer) {
    // console.log('Hello ImgLazyLoadDirective Directive');
    this.setSrc(this._defaultSrc);
  }

  @Input() set defaultSrc(src: string) {
    this._defaultSrc = src || this._defaultSrc;
  }
  @Input('img-lazy-load') src: string;

  ngOnInit() {
    let img = new Image();
    img.src = this.src;
    img.onload = () => {
      this._defaultSrc = this.src;
      // setTimeout(() => {
        this.setSrc(this._defaultSrc);
      // }, 1000)
    }
  }

  private setSrc(src: string) {
    this.renderer.setElementAttribute(this.element.nativeElement, 'src', src);
  }

}
