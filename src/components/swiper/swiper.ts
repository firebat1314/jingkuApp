import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';
import Swiper from 'swiper';

/**
 * Generated class for the SwiperComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
   selector: 'swiper',
   templateUrl: 'swiper.html'
})
export class SwiperComponent {

   //存储swiper对象
   mySwiper: any = null;
   @Input() data: Array<any>;
   activeIndex = 0;

   constructor(
      public modalCtrl: ModalController,
   ) { }


   ngOnChanges() {
      // this.mySwiper ? this.mySwiper.updateSlides() : null;
   }

   ngAfterViewInit() {
      let _this = this;
      if (this.data.length) {
         this.mySwiper = new Swiper(".myswiper-container", {
            // loop: true,
            slidesPerView: "auto",
            centeredSlides: true,
            watchSlidesProgress: true,
            on: {
               progress: function (progress) {
                  var b, c, d, scale, es, nub;
                  for (b = 0; b < this.slides.length; b++) {
                     c = this.slides[b];
                     d = c.progress;
                     scale = 1 - Math.min(Math.abs(.2 * d), 1);
                     es = c.style;
                     // this.element.nativeElement.style.height = c.offsetHeight+'px';
                     es.opacity = 1 - Math.min(Math.abs(d / 2), 1);
                     es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = "translate3d(0px,0," + -Math.abs(150 * d) + "px)";
                     // nub = this.element.nativeElement.querySelector('.page-nub').style;
                     // console.log(c.progress,es.opacity)
                     // nub.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = nub.transform = 'scaleX(' + es.opacity + ')';
                     _this.activeIndex = this.activeIndex;
                  }
               },
               setTransition: function (event) {
                  for (var c = 0; c < this.slides.length; c++) {
                     let es = this.slides[c].style;
                     es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = event + "ms"
                  }
               },
               slideChange: function (event) {
                  _this.activeIndex = this.activeIndex;
               }
            },

         })
      }
   }

   viewImages(index) {
      console.log(GalleryModal)
      var arr = new Array();
      if (this.data.length) {
         this.data.forEach(element => {
            arr.push({ url: element.img_url });
         });
      }
      this.modalCtrl.create(GalleryModal, {
         photos: arr,
         initialSlide: index,
      }).present();
   }
}
