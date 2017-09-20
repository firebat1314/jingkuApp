import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
declare var Swiper: any;

/**
 * Generated class for the SjPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sj',
  templateUrl: 'sj.html',
})
export class SjPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SjPage');
  }

  ngAfterViewInit(){
    new Swiper(".sheji-swiper", {
      // loop: true,
      slidesPerView: "auto",
      centeredSlides: true,
      watchSlidesProgress: true,
      loop:true,
      onProgress: (swiper, progress) => {
        var b, c, d, scale, es, nub;
        for (b = 0; b < swiper.slides.length; b++) {
          c = swiper.slides[b];
          d = c.progress;
          scale = 1 - Math.min(Math.abs(.2 * d), 1);
          es = c.style;
          // this.element.nativeElement.style.height = c.offsetHeight+'px';
          es.opacity = 1 - Math.min(Math.abs(d / 2), 1);
          es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = "translate3d(0px,0," + -Math.abs(150 * d) + "px)";
          // nub = this.element.nativeElement.querySelector('.page-nub').style;
          // console.log(c.progress,es.opacity)
          // nub.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = nub.transform = 'scaleX(' + es.opacity + ')';
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
}
