import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Events, ViewController, AlertController } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";
import { ShippingAddressPage } from "../../account-management/shipping-address/shipping-address";
import { OrderModalShippingPage } from "./order-modal-shipping/order-modal-shipping";
import { OrderModalDistributionPage } from "./order-modal-distribution/order-modal-distribution";
import { OrderModalCouponPage } from "./order-modal-coupon/order-modal-coupon";
import { OrderModalPaymentPage } from "./order-modal-payment/order-modal-payment";
import { PaymentMethodPage } from "../payment-method/payment-method";
import { AllOrdersPage } from "../all-orders";
import { OrdersDetailPage } from "../orders-detail/orders-detail";
import { Native } from "../../../../providers/native";

/*
  Generated class for the WriteOrders page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-write-orders',
  templateUrl: 'write-orders.html'
})
export class WriteOrdersPage {
  paymentMothdID: any;
  paymentMothdDesc: any;
  data: any;
  defaultShipping: any;
  goodsType: string = this.navParams.get('type');

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
    this.getHttpData();
    this.events.subscribe('writeOrder:refresh', () => {
      this.getHttpData();
    })
  }
  ngOnDestroy() {
    this.events.unsubscribe('writeOrder:refresh');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WriteOrdersPage');
  }
  getHttpData() {
    this.httpService.checkout().then((res) => {
      console.log(res);
      if (res && res.status == 1) {
        this.data = res;
        //选中地址
        for (let i = 0; i < this.data.consignee_list.length; i++) {
          if (this.data.consignee_list[i].selected == 1) {
            this.defaultShipping = this.data.consignee_list[i]
          }
        }
        //选中支付方式
        for (let i = 0; i < this.data.payment_list.length; i++) {
          if (this.data.payment_list[i].selected == 1) {
            this.paymentMothdID = this.data.payment_list[i].pay_id
            this.paymentMothdDesc = this.data.payment_list[i].pay_desc
          }
        }
      }
    })
  }
  checkShippingAddress() {
    this.navCtrl.push(ShippingAddressPage)
  }
  openOrderModalShippingPage() {//收货地址
    this.navCtrl.push(OrderModalShippingPage, { data: this.data.consignee_list, callBack: this.callBack });
  }
  checkShipping(params) {
    this.httpService.changeConsignee({ address_id: params.address_id }).then((res) => {
      console.log(res);
      if (res.status == 1) {
        this.getHttpData();
      }
    })
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
  openOrderModalDistributionPage(item) {//配送方式
    let modal = this.modalCtrl.create(OrderModalDistributionPage, { data: item.shipping });
    modal.onDidDismiss(data => {
      console.log('配送方式', data);
      if (data) {
        this.httpService.selectShippinSuppliers({ suppliers_id: item.suppliers_id, shipping: data.shipping_id }).then((res) => {
          console.log(res);
          if (res.status == 1) {
            this.getHttpData();
            item.distributionMethod = data.shipping_name;
          }
        })
      }
    });
    modal.present();
  }
  openOrderModalCouponPage(item) {//优惠券
    let modal = this.modalCtrl.create(OrderModalCouponPage, { data: item.use_bonus });
    modal.onDidDismiss(data => {
      console.log('优惠券', data);
      if (data) {
        this.httpService.suppliersBouns({ suppliers_id: item.suppliers_id, bonus_id: data.bonus_id }).then((res) => {
          console.log(res);
          if (res.status == 1) { this.getHttpData() }
        })
      }
    });
    modal.present();
  }
  openOrderPaymentModal(item) {//支付方式
    let modal = this.modalCtrl.create(OrderModalPaymentPage, { data: item.payment_list });
    modal.onDidDismiss(data => {
      console.log('支付方式', data);
      if (data) {
        this.paymentMothdID = data.pay_id;
        this.httpService.selectPayment({ pay_id: data.pay_id }).then((res) => {
          console.log(res);
          if (res.status == 1) { this.getHttpData() }
        })
      }
    });
    modal.present();
  }
  popPage() {
    this.events.publish('car:updata');
  }
  onsubmit() {
    let commentArr = [];
    let suppliers = [];
    for (var i = 0; i < this.data.cart_goods_list.length; i++) {
      commentArr.push(this.data.cart_goods_list[i].beizhu)
      suppliers.push(this.data.cart_goods_list[i].suppliers_id)
    }
    if (this.paymentMothdID == 3) {
      this.native.openAlertBox('确认余额支付', () => {
        this.httpService.submitOrder({
          notes: {
            note: commentArr,
            suppliers: suppliers
          }
        }).then((res) => {
          if (res.status == 1) {
            this.native.showToast(res.info);
            this.navCtrl.push(AllOrdersPage);
            this.events.publish('car:updata');
            // this.viewCtrl.dismiss();
          }
        })
      })
    } else {
      this.httpService.submitOrder({
        notes: {
          note: commentArr,
          suppliers: suppliers
        }
      }).then((res) => {
        if (res.status == 1) {
          this.events.publish('car:updata');
          if (this.paymentMothdID == 6) {
            this.httpService.pay({ order_id: res.order_id }).then((res) => {
              if (res.status == 1) {
                this.navCtrl.push(PaymentMethodPage, { data: res });
              }
            })
          } else if (this.paymentMothdID == 4) {
            this.navCtrl.push(OrdersDetailPage, { order_id: res.order_id });
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
        } else if (res.status == -1) {
          this.navCtrl.pop();
        }
      })
    }
  }
}
