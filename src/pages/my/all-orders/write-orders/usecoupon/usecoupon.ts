import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, Events } from 'ionic-angular';
import { HttpService } from "../../../../../providers/http-service";

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
  data: any;
  couponSelect = 'usable';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public events: Events,
  ) {
    this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsecouponPage');
  }
  getData() {
    return this.httpService.checkout().then((res) => {
      this.data = res;
    })
  }
  suppliersBouns(suppliers_id, bonus_id) {
    this.httpService.suppliersBouns({ suppliers_id: suppliers_id, bonus_id: bonus_id }).then((res) => {
      if (res.status == 1) {
        this.getData().then(() => {
          this.events.publish('writeOrder:refresh');
        })
      }
    })
  }

}
