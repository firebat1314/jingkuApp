import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content } from 'ionic-angular';
import { MineProvider } from '../../../../providers/mine/mine';
import { HttpService } from '../../../../providers/http-service';
import { Native } from '../../../../providers/native';

/**
 * Generated class for the OrderDetailDistributionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment:'order-detail-distribution/:order_id'
})
@Component({
  selector: 'page-order-detail-distribution',
  templateUrl: 'order-detail-distribution.html',
})
export class OrderDetailDistributionPage {

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
    private mine: MineProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailDistributionPage');
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
    if (!this.mine.canCheckout) { this.native.showToast('暂无结算权限，请联系企业管理员'); return false }
    this.navCtrl.push('PaymentMethodPage', { order_id: id,isDistribution:1 })
  }
  confirmReceipt(order_id) {
    this.native.openAlertBox('确认收货', () => {
      this.httpService.affirmReceived({ order_id: order_id }).then((res) => {
        if (res.status == 1) {
          this.native.showToast(res.data);
          this.navCtrl.pop().catch(res => { history.back() });
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
          this.navCtrl.pop().catch(res => { history.back() });
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
          this.navCtrl.pop().catch(res => { history.back() });
          this.events.publish('allOrders:update');
          this.events.publish('my:update');
        }
      })
    })
  }
  viewerContract(order_id) {
		this.httpService.infoUrl_d({ order_id: order_id }).then(res => {
			if (res.status) {
				this.navCtrl.push('ViewerContractPage',{url:res.url});
			}
		})
  }
	sealContract(order_id) {
		this.httpService.sealIndex({ order_id: order_id }).then(res => {
			if (res.status == 1) {
        location.href = res.url;
				// this.navCtrl.push('ViewerContractPage', { url: res.url });
			}
		})
	}
}
