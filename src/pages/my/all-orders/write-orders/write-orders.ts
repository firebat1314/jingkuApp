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
  segment: 'write-orders'
})
@Component({
  selector: 'page-write-orders',
  templateUrl: 'write-orders.html'
})
export class WriteOrdersPage {
  noteStatus: boolean;
  paymentMothdID: any;
  paymentMothdDesc: any;
  data: any;
  goodsType: string = this.navParams.get('type');
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
    return new Promise((resolve, reject) => {
      this.httpService.checkout().then((res) => {
        resolve();
        if (res && res.status == 1) {
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
              this.paymentMothdID = this.data.payment_list[i].pay_id
              this.paymentMothdDesc = this.data.payment_list[i].pay_desc
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
            for (let j = 0, bonus = item[i].use_bonus; j < bonus.length; j++) {
              if (bonus[j].selected == 1) {
                this.selectedBonus.push(bonus[j])
              }
            }
          }
          console.log(this.selectedBonus)
          //note 是否填写
          this.noteStatus = JSON.stringify(this.data.suppliers_notes) == '[]';
        }
      })
    });
  }
  checkShippingAddress() {
    this.navCtrl.push('ShippingAddressPage')
  }
  openOrderModalShippingPage() {//收货地址
    this.navCtrl.push('OrderModalShippingPage', { callBack: this.callBack });
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
  goPayAndShipPage() {
    if (!this.defaultShipping) {
      this.native.showToast('请选择收货地址')
      return
    }
    this.navCtrl.push('PayAndShipPage')
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
    this.navCtrl.push('BusinessmenNotePage')
  }
  onsubmit() {
    let commentArr = [];
    let suppliers = [];
    for (var i in this.data.suppliers_notes) {
      if (this.data.suppliers_notes[i]) {
        commentArr.push(this.data.suppliers_notes[i])
        suppliers.push(i)
      }
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
            this.navCtrl.push('AllOrdersPage');
            this.navCtrl.remove(1);
            this.events.publish('my:refresh');
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
          this.events.publish('my:refresh');
          this.events.publish('car:updata');
          if (this.paymentMothdID == 6) {
            this.httpService.pay({ order_id: res.order_id }).then((res) => {
              if (res.status == 1) {
                this.navCtrl.push('PaymentMethodPage', { data: res });
                this.navCtrl.remove(1);
              }
            })
          } else if (this.paymentMothdID == 4) {
            this.navCtrl.push('OrdersDetailPage', { order_id: res.order_id });
            this.navCtrl.remove(1);
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
