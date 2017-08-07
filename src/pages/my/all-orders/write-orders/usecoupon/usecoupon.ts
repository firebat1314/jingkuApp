import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

/**
 * Generated class for the UsecouponPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-usecoupon',
  templateUrl: 'usecoupon.html',
})
export class UsecouponPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsecouponPage');
  }

}
