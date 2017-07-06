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
  unusedBonusData: any;
  usedBonusData: any;
  staleBonusData: any;
  couponSelect = 'unused';//or stale or used or unused
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService
  ) {
    this.httpResult()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CouponPage');
  }

  httpResult(finish?) {
    //over_time use 
    this.httpService.getUserBonus().then((res) => {
      console.log('可用红包', res)
      if (res.status == 1) { this.unusedBonusData = res; }
      this.httpService.getUserBonus({ bonus_type: 'over_time' }).then((res) => {
        console.log('过期红包', res)
        if (res.status == 1) { this.staleBonusData = res; }
        this.httpService.getUserBonus({ bonus_type: 'use' }).then((res) => {
          console.log('已使用红包', res)
          if (res.status == 1) { this.usedBonusData = res; }
          if (finish) { finish() }
        })
      })
    })
  }
  /*下拉刷新*/
  doRefresh(refresher) {
    this.httpResult(() => {
      setTimeout(() => {
        refresher.complete();
      }, 500);
    })

  }
}
