import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the OrderModalCoupon page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-order-modal-coupon',
  templateUrl: 'order-modal-coupon.html'
})
export class OrderModalCouponPage {
  data = this.navParams.get('data');
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    console.log(this.data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderModalCouponPage');
  }
  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }
}
