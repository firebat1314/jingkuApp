import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Events, ViewController, AlertController, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";
import { Native } from "../../../../providers/native";
declare var _hmt;

declare var _hmt;
/*
  Generated class for the WriteOrders page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage({
   segment: 'write-orders/:type/:dId/:scanner'
})
@Component({
   selector: 'page-write-orders',
   templateUrl: 'write-orders.html'
})
export class WriteOrdersPage {
   paymentMothdName: any;
   user_money: any;
   noteStatus: boolean = false;
   paymentMothdID: any;
   paymentMothdDesc: any;
   data: any;
   goodsType: string = this.navParams.get('type');
   dId: number = this.navParams.get('dId');
   scanner: number = this.navParams.get('scanner');
   //选中地址
   defaultShipping: any;
   //选中的快递
   selectedShip: string;
   selectedBonus: Array<any> = [];
   selectedShipBonus: any[];
   shipBonus: any;
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
      /* 获取余额 */
      this.httpService.userInfo().then((res) => {
         if (res.status) this.user_money = res.data.user_money
      })
   }
   getHttpData() {
      if (this.dId > 0) {
         return this.httpService.checkout_d({ id: this.dId }).then(res => {
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
               this.native.openAlertBox(res.info, () => {
                  this.navCtrl.pop({ animate: true }).then(() => {
                     this.navCtrl.push('CompanyInfoPage');
                  }).catch(() => { history.back() });
               })
            } else {
               this.navCtrl.pop({ animate: true }).catch(() => { history.back() });
            }
            alert(res.status)
         })
      }
      return this.httpService.checkout({ type: this.scanner > 0 ? 1 : null }).then((res) => {
         if (res.status == 1) {
            this.data = res;
            //选中地址
            if (this.data.consignee_list.length == 0) {
               this.defaultShipping = null;
            } else {
               for (let i = 0, item = this.data[this.data.is_interim > 0 ? 'interim_consignee_list' : 'consignee_list']; i < item.length; i++) {
                  if (item[i].selected == 1) {
                     this.defaultShipping = item[i]
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
            var aShip = new Array();
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
            aShip = null;
            //已选择优惠券 yes_bonus
            this.selectedBonus = [];
            for (let i = 0, item = this.data.cart_goods_list; i < item.length; i++) {
               for (let j = 0, bonus = item[i].use_bonus || []; j < bonus.length; j++) {
                  if (bonus[j].selected == 1) {
                     this.selectedBonus.push(bonus[j])
                  }
               }
            }
            //已选择运费优惠券
            this.selectedShipBonus = [];
            for (let i = 0, item = this.data.cart_goods_list; i < item.length; i++) {
               for (let j = 0, bonus = item[i].use_shipping_bonus || []; j < bonus.length; j++) {
                  if (bonus[j].selected == 1) {
                     this.selectedShipBonus.push(bonus[j])
                  }
               }
            }
            //可用运费优惠券
            this.shipBonus = this.data.cart_goods_list.reduce((x, y) => x + (y.use_shipping_bonus.length), 0);

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
            for (let i = 0, item = this.data.cart_goods_list; i < item.length; i++) {
               for (let j = 0, order_label = item[i].order_label; j < order_label.length; j++) {
                  if (order_label[j].selected) {
                     this.noteStatus = true;
                     break;
                  }
               }
            }
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
   change_machining(toggle) {
      this.httpService.change_machining().then((res) => {
         this.getHttpData();
      });
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
   goCouponShipPage() {
      if (!this.selectedShip) {
         return this.native.showToast('请选择配送方式')
      }
      this.navCtrl.push('CouponShipPage');
   }
   goBusinessmenNotePage() {
      if (!this.defaultShipping) {
         this.native.showToast('请选择收货地址')
         return
      }
      this.navCtrl.push('BusinessmenNotePage', { dId: this.dId })
   }
   done(): Promise<any> {
      let commentArr = [];
      let suppliers = [];
      let label = [];
      for (var i in this.data.suppliers_notes) {
         commentArr.push(this.data.suppliers_notes[i]);
      }
      for (let i = 0; i < this.data.cart_goods_list.length; i++) {
         var sArr = [];
         suppliers.push(this.data.cart_goods_list[i].suppliers_id);
         for (var j = 0; j < this.data.cart_goods_list[i].order_label.length; j++) {
            if (this.data.cart_goods_list[i].order_label[j].selected) {
               sArr.push(j);
            }
         }
         label.push(sArr);
      }

      return this.httpService.submitOrder({
         notes: {
            note: commentArr,
            suppliers: suppliers,
            label: label
         },
         type: this.scanner > 0 ? 1 : null
      }).then((res) => {
         if (res.info == '请先完善收货信息') {
            this.openOrderModalShippingPage();
         } else if (res.info == '购物车中没有商品') {
            this.navCtrl.pop().catch(res => { history.back() });
         } else if (res.info == '请选择支付方式' || res.info == '请先选择配送方式') {
            this.goPayAndShipPage();
         }
         return res;
      })
   }
   onsubmit() {
      // if (this.data.is_surplus) {//是否使用余额支付按钮
      //   this.native.openAlertBox('使用余额支付', () => {
      //     this.done().then((res) => {
      //       if (res.status == 1) {
      //         if (res.is_pay) {
      //           this.navCtrl.push('AllOrdersPage');
      //           this.native.showToast('支付成功');
      //         } else {
      //           this.native.showToast('需要组合支付');
      //           this.navCtrl.push('PaymentMethodPage', { order_id: res.order_id });
      //         }
      //         this.events.publish('my:update');
      //         this.events.publish('car:update');
      //         // this.viewCtrl.dismiss();
      //       }
      //     })
      //   })
      // } else {
      this.done().then((res) => {
         console.log(res)
         if (res.status == 1) {
            var item = [];
            for (var i = 0, item1 = this.data.cart_goods_list; i < item1.length; i++) {
               for (var m = 0, item2 = item1[i].goods_list; m < item2.length; m++) {
                  for (var s = 0, item3 = item2[m].attrs; s < item3.length; s++) {
                     item.push({
                        "skuId": item3[s].goods_id,
                        "skuName": item3[s].goods_name,
                        "category": item3[s].rec_id || '123123',
                        "Price": item3[s].goods_price.indexOf('¥') > -1 ? item3[s].goods_price.replace('¥', '') : item3[s].goods_price,
                        "Quantity": item3[s].goods_number
                     })
                  }
               }
            }
            _hmt && _hmt.push(['_trackOrder', {
               "orderId": res.order_id,
               "orderTotal": this.data.total.amount_formated,
               "item": item
            }]);

            this.events.publish('car:update');
            this.events.publish('my:update');
            if (this.paymentMothdID == 6) {
               var view = this.viewCtrl;
               this.navCtrl.push('PaymentMethodPage', { order_id: res.order_id, log_id: res.log_id, isDistribution: 0 }).then(() => {
                  this.navCtrl.removeView(view);
               });
            } else if (this.paymentMothdID == 4) {
               var view = this.viewCtrl;
               this.navCtrl.push('AllOrdersPage').then(() => {
                  this.navCtrl.removeView(view);
               });;
               this.alertCtrl.create({
                  title: '汇款须知',
                  subTitle: this.paymentMothdDesc,
                  buttons: [{
                     text: '确认'
                  }],
                  cssClass: 'recharge-alert'
               }).present();
            }
            // this.viewCtrl.dismiss();
         }
      })
      // }
   }
}
