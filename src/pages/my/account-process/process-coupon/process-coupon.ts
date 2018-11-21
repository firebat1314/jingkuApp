import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, Events } from 'ionic-angular';
import { HttpService } from '../../../../providers/http-service';
import { ViewController } from 'ionic-angular/navigation/view-controller';

@IonicPage()
@Component({
   selector: 'page-process-coupon',
   templateUrl: 'process-coupon.html',
})
export class ProcessCouponPage {
   data: any = this.navParams.get('data');
   callback: any = this.navParams.get('callback');
   order_id: any = this.navParams.get('order_id');
   is_scanner: any = this.navParams.get('is_scanner');

   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public httpService: HttpService,
      public events: Events,
      public viewCtrl: ViewController,
   ) {
      /* this.getData(); */
   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad ProcessCouponPage');
   }
   /* getData() {
      return this.httpService.glassMachining().then((res) => {
         this.data = res;
      })
   } */
   suppliersBouns(suppliers_id, bonus, bonus_list) {
      if (this.is_scanner) {
         this.httpService.special_suppliers_bouns({ suppliers_id: suppliers_id, bonus_id: bonus.bonus_id }).then((res) => {
            if (res.status == 1) {
               if (bonus.selected == 1) {
                  for (let i = 0; i < bonus_list.length; i++) {
                     bonus_list[i].selected = 0;
                  }
               } else {
                  for (let i = 0; i < bonus_list.length; i++) {
                     bonus_list[i].selected = 0;
                  }
                  bonus.selected = 1;
               }
            }
         })
      } else {
         this.httpService.suppliers_bouns({ suppliers_id: suppliers_id, bonus_id: bonus.bonus_id, order_id: this.order_id }).then((res) => {
            if (res.status == 1) {
               if (bonus.selected == 1) {
                  for (let i = 0; i < bonus_list.length; i++) {
                     bonus_list[i].selected = 0;
                  }
               } else {
                  for (let i = 0; i < bonus_list.length; i++) {
                     bonus_list[i].selected = 0;
                  }
                  bonus.selected = 1;
               }
            }
         })
      }
   }
   confirm() {
      this.callback();
      this.viewCtrl.dismiss();
   }

}
