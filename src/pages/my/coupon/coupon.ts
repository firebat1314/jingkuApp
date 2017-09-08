import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";

/*
  Generated class for the Coupon page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-coupon',
  templateUrl: 'coupon.html'
})
export class CouponPage {
  data: any;
  couponSelect = '';//'' or over_time or use
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService
  ) {
    this.segmentChange()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CouponPage');
  }

  segmentChange() {
    //over_time use 
    this.data = null;
    return this.httpService.getUserBonus({ bonus_type: this.couponSelect || null }).then((res) => {
      if (res.status == 1) { this.data = res; }
    })
  }
  /*下拉刷新*/
  doRefresh(refresher) {
    this.segmentChange().then(() => {
      setTimeout(() => {
        refresher.complete();
      }, 500);
    })

  }
}
