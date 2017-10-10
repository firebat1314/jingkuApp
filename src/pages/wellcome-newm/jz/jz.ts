import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
declare var WOW: any;
declare let Swiper: any;
/**
 * Generated class for the JzPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jz',
  templateUrl: 'jz.html',
})
export class JzPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,    public ele: ElementRef,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JzPage');
  }
  ngAfterViewInit() {

    var wow = new WOW({
      element:this.ele.nativeElement.querySelector('.content'),
      scrollElement: this.ele.nativeElement.querySelector('.scroll-content')
    }).init();
    var swiper = new Swiper('.cgong2-swiper', {
      pagination: '.swiper-pagination-cog',
      slidesPerView: 'auto',
      centeredSlides: true,
      paginationClickable: true,
      spaceBetween: 20,
      loop: true
    });
  }
}
