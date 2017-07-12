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

  private _defaultSrc = './assets/images/images/800-800.jpg';

  constructor(public element: ElementRef, public renderer: Renderer) {
    // console.log('Hello ImgLazyLoadDirective Directive');
  }

  @Input() set defaultSrc(src: string) {
    this._defaultSrc = src || this._defaultSrc;
  }
  @Input('img-lazy-load') src: string;

  ngOnInit(){
    this.setSrc(this._defaultSrc);
  }
  ngOnChanges() {
    let img = new Image();
    img.src = this.src;
    // console.log(this.src)
    img.onload = () => {
      // setTimeout(() => {
        this.setSrc(this.src);
      // }, 1000)
    }
  }

  private setSrc(src: string) {
    this.renderer.setElementAttribute(this.element.nativeElement, 'src', src);
  }

}
