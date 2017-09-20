import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

declare let Swiper:any;
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad JzPage');
  }
  ngAfterViewInit(){
    var swiper = new Swiper('.cgong2-swiper', {
      pagination: '.swiper-pagination-cog',
      slidesPerView: 'auto',
      centeredSlides: true,
      paginationClickable: true,
      spaceBetween: 20
  });
  }
}
