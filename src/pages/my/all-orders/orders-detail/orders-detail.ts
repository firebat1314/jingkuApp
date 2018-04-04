import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, IonicPage, Events } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";
import { Native } from "../../../../providers/native";

/*
  Generated class for the OrdersDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage({
  segment: 'orders-detail/:order_id'
})
@Component({
  selector: 'page-orders-detail',
  templateUrl: 'orders-detail.html'
})
export class OrdersDetailPage {
  data: any;
  orderId: any = this.navParams.get('order_id');

  payBtn: boolean = false;
  shippingBtn: boolean = false;
  confirmBtn: boolean = false;
  cancelBtn: boolean = false;

  @ViewChild(Content) content: Content
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public native: Native,
    public events: Events,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersDetailPage');
  }
  ngOnInit() {
    this.getOrderInfo();
  }
  clickAftermarket(evt) {
    evt.stopPropagation();
  }
  getOrderInfo() {
    this.httpService.orderInfo({ order_id: this.orderId }).then((res) => {
      // console.log(res);
      if (res.status == 1) {
        this.data = res;
        // this.showBtn();
        this.content.resize();
      }
    })
  }
  /*showBtn() {
    if (this.data.order.pay_status == 0 && this.data.order.order_status != 4 && this.data.order.order_status != 2 && this.data.order.order_status != 3 && this.data.order.order_status != 7 && this.data.order.order_status != 8) {
      this.payBtn = true;
    }else if (this.data.order.order_status == 0) {
      this.cancelBtn = true;
    }else if (this.data.order.order_status == 5 && this.data.order.order_status == 1) {
      this.confirmBtn = true;
      this.shippingBtn = true;
    }
  }*/
  goParticularsPage(id, cutId) {
    this.navCtrl.push('ParticularsPage', { goodsId: id, cutId: cutId });
  }
  toPay(id) {
    this.navCtrl.push('PaymentMethodPage', { order_id: id })
  }
  confirmReceipt(order_id) {
    this.native.openAlertBox('确认收货', () => {
      this.httpService.affirmReceived({ order_id: order_id }).then((res) => {
        if (res.status == 1) {
          this.native.showToast(res.data);
          this.navCtrl.pop();
          this.events.publish('allOrders:update');
          this.events.publish('my:update');
        }
      })
    })
  }
  orderTracking(order_id) {
    this.native.showToast('敬请期待');
  }
  cancelOrder(order_id) {
    this.native.openAlertBox('取消订单', () => {
      this.httpService.cancelOrder({ order_id: order_id }).then((res) => {
        if (res.status == 1) {
          this.native.showToast(res.data);
          this.navCtrl.pop();
          this.events.publish('allOrders:update');
          this.events.publish('my:update');
        }
      })
    })
  }
  deleteOrder(order_id) {
    this.native.openAlertBox('删除订单', () => {
      this.httpService.delOrder({ order_id: order_id }).then((res) => {
        if (res.status == 1) {
          this.native.showToast(res.data);
          this.navCtrl.pop();
          this.events.publish('allOrders:update');
          this.events.publish('my:update');
        }
      })
    })
  }
}
