import { Component, Input, ElementRef } from '@angular/core';

/**
 * Generated class for the SwiperComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
declare var Swiper: any;
@Component({
  selector: 'swiper',
  templateUrl: 'swiper.html'
})
export class SwiperComponent {

  //存储swiper对象
  mySwiper: any = null;
  @Input() data: any;

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    var timer = setInterval(() => {
      if (this.data) {
        clearInterval(timer)
        this.mySwiper = new Swiper(".myswiper-container", {
          // loop: true,
          slidesPerView: "auto",
          centeredSlides: true,
          watchSlidesProgress: true,
          onProgress: function (a) {
            var b, c, d, scale, es;
            for (b = 0; b < a.slides.length; b++) {
              c = a.slides[b];
              d = c.progress;
              scale = 1 - Math.min(Math.abs(.2 * d), 1);
              es = c.style;
              es.opacity = 1 - Math.min(Math.abs(d / 2), 1);
              es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = "translate3d(0px,0," + -Math.abs(150 * d) + "px)"
            }
          },
          onSetTransition: function (a, b) {
            for (var c = 0; c < a.slides.length; c++) {
              let es = a.slides[c].style;
              es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = b + "ms"
            }
          }
        })
      }
    }, 10)
  }
}
