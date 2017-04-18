import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";
import { ShippingAddressPage } from "../../account-management/shipping-address/shipping-address";
import { OrderModalShippingPage } from "./order-modal-shipping/order-modal-shipping";
import { OrderModalDistributionPage } from "./order-modal-distribution/order-modal-distribution";
import { OrderModalCouponPage } from "./order-modal-coupon/order-modal-coupon";
import { OrderModalPaymentPage } from "./order-modal-payment/order-modal-payment";
import { PaymentMethodPage } from "../payment-method/payment-method";

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
  data: any;

  defaultShipping: any;

  commentArr: any = [];
  suppliers: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public modalCtrl: ModalController,
    private events:Events
  ) {
    this.getHttpData();
    this.events.subscribe('writeOrder:refresh',()=>{
      this.getHttpData();
    })
  }
  ngOnDestory(){
    this.events.unsubscribe('writeOrder:refresh')
  }
  getHttpData() {
    this.httpService.checkout().then((res) => {
      console.log(res);
      if (res && res.status == 1) {
        this.data = res;
        for (let i = 0; i < this.data.consignee_list.length; i++) {
          if (this.data.consignee_list[i].selected == 1) {
            this.defaultShipping = this.data.consignee_list[i]
          }
        }
      }
    })
  }
  checkShippingAddress() {
    this.navCtrl.push(ShippingAddressPage)
  }
  openOrderModalShippingPage() {//收货地址
    this.navCtrl.push(OrderModalShippingPage, { data: this.data.consignee_list, callBack: this.callBack }, { animation: 'ios-transition' });
    /*console.log()
    let modal = this.modalCtrl.create(OrderModalShippingPage, { data: this.data.consignee_list });
    modal.onDidDismiss(data => {
      console.log('收货地址', data);
      if (data) {
        this.httpService.changeConsignee({ address_id: data.address_id }).then((res) => {
          console.log(res);
          if (res.status == 1) {
            this.getHttpData();
          }
        })
      }
    });
    modal.present();*/
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
        this.httpService.selectPayment({ pay_id: data.pay_id }).then((res) => {
          console.log(res);
          if (res.status == 1) { this.getHttpData() }
        })
      }
    });
    modal.present();
  }
  goPaymentPage(res) {//支付方式页面
    this.navCtrl.push(PaymentMethodPage, { data: res })
  }
  onsubmit() {
    for (var i = 0; i < this.data.cart_goods_list.length; i++) {
      this.commentArr.push(this.data.cart_goods_list[i].beizhu)
      this.suppliers.push(this.data.cart_goods_list[i].suppliers_id)
    }
    this.httpService.submitOrder({
      notes: {
        note: this.commentArr,
        suppliers: this.suppliers
      }
    }).then((res) => {
      console.log(res);
      if (res.status == 1) {
        this.httpService.pay({ log_id: res.log_id }).then((res) => {
          console.log(res)
          if (res.status == 1) {
            this.goPaymentPage(res)
          }
        })
      }
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WriteOrdersPage');
  }

}
