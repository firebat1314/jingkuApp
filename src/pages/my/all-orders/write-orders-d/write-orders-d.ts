import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Events, ViewController, AlertController, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";
import { Native } from "../../../../providers/native";

/*
  Generated class for the WriteOrders page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage({
   segment: 'write-orders-d/:dId'
})
@Component({
   selector: 'page-write-orders-d',
   templateUrl: 'write-orders-d.html',
})
export class WriteOrdersDPage {
   paymentMothdName: any;
   user_money: any;
   noteStatus: boolean = false;
   paymentMothdID: any;
   paymentMothdDesc: any;
   data: any;
   dId: any = this.navParams.get('dId')&&this.navParams.get('dId').split('-')[0];
   linkID: any = this.navParams.get('dId')&&this.navParams.get('dId').split('-')[1];//铺货
   //选中地址
   defaultShipping: any;
   //选中的快递
   selectedShip: string;
   selectedBonus: Array<any> = [];
   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public httpService: HttpService,
      public modalCtrl: ModalController,
      private events: Events,
      private native: Native,
      public viewCtrl: ViewController,
      private alertCtrl: AlertController
   ) {
      this.events.subscribe('writeOrder:refresh', () => {
         this.getHttpData();
      })
      this.events.subscribe('updateAddress', () => {
         this.getHttpData();
      });
   }
   ngOnDestroy() {
      this.events.unsubscribe('writeOrder:refresh');
      this.events.unsubscribe('updateAddress');
   }
   ionViewDidLoad() {
      console.log('ionViewDidLoad WriteOrdersPage');
   }
   ngOnInit() {
      this.getHttpData();
   }
   getHttpData() {
      this.httpService.checkout_d({ id: this.dId,linkid:this.linkID }).then(res => {
         if (res.status == 1) {
            this.data = res;
            //选中地址
            if (this.data.consignee_list.length == 0) {
               this.defaultShipping = null;
            } else {
               for (let i = 0; i < this.data.consignee_list.length; i++) {
                  if (this.data.consignee_list[i].selected == 1) {
                     this.defaultShipping = this.data.consignee_list[i]
                  }
               }
            }
            //选中支付方式
            for (let i = 0; i < this.data.payment_list.length; i++) {
               if (this.data.payment_list[i].selected == 1) {
                  this.paymentMothdName = this.data.payment_list[i].pay_name;
                  this.paymentMothdID = this.data.payment_list[i].pay_id;
                  this.paymentMothdDesc = this.data.payment_list[i].pay_desc;
               }
            }
            //选中的快递方式
            /* var aShip = new Array();
            for (let i = 0, store = this.data.cart_goods_list; i < store.length; i++) {
              for (let j = 0, ship = store[i].shipping; j < ship.length; j++) {
                if (ship[j].selected == 1) {
                  if (aShip.indexOf(ship[j].shipping_name) == -1) {
                    aShip.push(ship[j].shipping_name)
                  }
                }
              }
            } 
            this.selectedShip = aShip.join('+');
            aShip = null;*/

            //note 是否填写
            this.noteStatus = false;
            for (var note in this.data.suppliers_notes) {
               if (this.data.suppliers_notes.hasOwnProperty(note)) {
                  var item = this.data.suppliers_notes[note];
                  if (item) {
                     this.noteStatus = true;
                     console.log(item);
                     break;
                  }
               }
            }
            for (let j = 0, order_label = this.data.order_label; j < order_label.length; j++) {
               if (order_label[j].selected) {
                  this.noteStatus = true;
                  break;
               }
            }
         } else if (res.status == -1) {
            this.alertCtrl.create({
               cssClass: 'alert-style',
               title: res.info,
               buttons: [
                  {
                     text: '确认',
                     handler: () => {
                        this.navCtrl.pop({ animate: true }).then(() => {
                           this.navCtrl.push('DistributionQualificationPage');
                        }).catch(() => { history.back() });
                     }
                  }
               ],
            }).present();
         } else {
            this.navCtrl.pop({ animate: true }).catch(() => { history.back() });
         }
      })

   }
   checkShippingAddress() {
      this.navCtrl.push('ShippingAddressPage')
   }
   openOrderModalShippingPage() {//收货地址
      this.navCtrl.push('OrderModalShippingPage', { callBack: this.callBack, dId: this.dId });
   }
   callBack(params) {
      return new Promise((resolve, reject) => {
         if (typeof (params) != 'undefined') {
            console.log('收货地址', params);
            this.defaultShipping = params
            resolve('ok')
         } else {
            reject('error')
         }
      })
   }
   changeSurplus(toggle) {
      if (toggle) {
         this.httpService.changeSurplus({ surplus: 1 }).then((res) => {
            this.getHttpData()
         });
      } else {
         this.httpService.changeSurplus({ surplus: 0 }).then((res) => {
            this.getHttpData()
         });
      }
   }
   goPayAndShipPage() {
      if (!this.defaultShipping) {
         this.native.showToast('请选择收货地址')
         return
      }
      this.navCtrl.push('PayAndShipPage', { dId: this.dId })
   }
   goUsecouponPage() {
      if (!this.defaultShipping) {
         this.native.showToast('请选择收货地址')
         return
      }
      this.navCtrl.push('UsecouponPage')
   }
   goBusinessmenNotePage() {
      if (!this.defaultShipping) {
         this.native.showToast('请选择收货地址')
         return
      }
      this.navCtrl.push('BusinessmenNotePage', { dId: this.dId })
   }
   done(): Promise<any> {
      let commentArr = this.data.suppliers_notes;
      var sArr = []
      for (var j = 0; j < this.data.order_label.length; j++) {
         if (this.data.order_label[j].selected) {
            sArr.push(j)
         }
      }
      return new Promise((resolve) => {
         this.httpService.done_d({
            notes: {
               note: commentArr,
               label: sArr
            },
            id: this.dId
            ,linkid:this.linkID
         }).then((res) => {
            if (res.info == '请先完善收货信息') {
               this.openOrderModalShippingPage();
               return
            } else if (res.info == '购物车中没有商品') {
               this.navCtrl.pop().catch(res => { history.back() });
            } else if (res.info == '请选择支付方式') {
               this.goPayAndShipPage();
            }
            resolve(res)
         })
      });
   }
   onsubmit() {
      this.done().then((res) => {
         if (res.status == 1) {
            // this.events.publish('car:update');
            this.events.publish('my:update');

            this.alertCtrl.create({
               title: '提示',
               subTitle: res.info,
               buttons: [{
                  text: '确认',
                  handler: () => {
                     var view = this.viewCtrl;
                     this.navCtrl.push('OrderListDistributionPage').then(() => {
                        this.navCtrl.removeView(view);
                     });
                  }
               }],
               cssClass: 'recharge-alert'
            }).present();

         } else if (res.status == -1) {
            this.alertCtrl.create({
               cssClass: 'alert-style',
               title: res.info,
               buttons: [
                  {
                     text: '确认',
                     handler: () => {
                        this.viewCtrl.dismiss((navCtrl) => {
                           navCtrl.push('DistributionQualificationPage');
                        });
                     }
                  }
               ],
            }).present();
         }
      })
      // }
   }
}
