import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

/**
 * Generated class for the WellcomeNewmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var Swiper: any;
declare var WOW: any;

@IonicPage()
@Component({
  selector: 'page-wellcome-newm',
  templateUrl: 'wellcome-newm.html',
})
export class WellcomeNewmPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WellcomeNewmPage');
  }
  ngAfterViewInit() {
    var wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true
    });
    wow.init();

  }
}
