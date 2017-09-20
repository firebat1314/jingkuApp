import { Component, Input, ElementRef, Renderer } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SwiperNewmComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
declare var Swiper: any;

@Component({
  selector: 'swiper-newm',
  templateUrl: 'swiper-newm.html'
})
export class SwiperNewmComponent {

  @Input() img: string;

  constructor(
    private ele: ElementRef,
    private render: Renderer,
    private navCtrl: NavController,
    private storage: Storage,
    private platform: Platform,
  ) {
    console.log('Hello SwiperNewmComponent Component');
  }

  ngAfterViewInit() {
    var swiperContainer = this.ele.nativeElement.querySelector('.swiper-slide');
    this.render.setElementStyle(swiperContainer, 'background', 'url(' + this.img + ') no-repeat center/100% auto')
    var swiper = new Swiper('.car-swiper', {
      animate: false,
      // pagination: '.swiper-pagination',
      // paginationClickable: true,
      // autoplay: 3000,
      loop: false,
      // parallax: true,
      // speed: 800,
    });
  }
  goToHome() {
    this.storage.get('hasLoggedIn').then((result) => {
      if (result) {
        this.navCtrl.setRoot('TabsPage', {}, { animate: true, direction: 'forward' });
      } else {
        // this.navCtrl.setRoot('LoginPage', {}, { animate: true, direction: 'forward' });
        this.navCtrl.push('LoginPage');
      }
    });
  }
  download(){
    if(this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone')){}
  }
}
