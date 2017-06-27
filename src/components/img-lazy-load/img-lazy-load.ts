import { Component, Input, Renderer, ElementRef } from '@angular/core';

/**
 * Generated class for the ImgLazyLoadComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'img-lazy-load',
  templateUrl: 'img-lazy-load.html'
})
export class ImgLazyLoadComponent {

  default: string = './assets/images/images/logo.jpg';
  constructor(public element: ElementRef, public renderer: Renderer) {

    // console.log('Hello ImgLazyLoadComponent Component');
  }

  @Input() src: string //要显示的图片
  @Input() alt: string = 'jingkoo' //alt

  ngOnInit() {
    let img = new Image();
    img.src = this.src;
    img.onload = () => {
      this.default = this.src;
    }
  }

}
