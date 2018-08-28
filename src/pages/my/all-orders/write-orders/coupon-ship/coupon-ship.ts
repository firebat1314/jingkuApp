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
   selector: 'page-coupon-ship',
   templateUrl: 'coupon-ship.html',
})
export class CouponShipPage {
   data: any;
   couponSelect = 'usable';
   shipBonus: any;
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
         //可用运费优惠券
         this.shipBonus = this.data.cart_goods_list.reduce((x,y)=>x+(y.use_shipping_bonus.length),0);
      })
   }
   suppliersBouns(suppliers_id, bonus_id) {
      this.httpService.suppliersBouns({ suppliers_id: suppliers_id, bonus_id: bonus_id, type: 1 }).then((res) => {
         if (res.status == 1) {
            this.getData().then(() => {
               this.events.publish('writeOrder:refresh');
            })
         }
      })
   }

}
