import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, IonicPage, Events, AlertController } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";
import { Native } from "../../../../providers/native";
import { MineProvider } from '../../../../providers/mine/mine';
import { QimoChatProvider } from '../../../../providers/qimo-chat/qimo-chat';

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
		private mine: MineProvider,
		private alertCtrl: AlertController,
		private QimoChat: QimoChatProvider,
	) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad OrdersDetailPage');
	}
	ngOnInit() {
		this.getOrderInfo();
	}
	copyText(value) {
		return new Promise((resolve, reject) => {
			var /** @type {?} */ copyTextArea = /** @type {?} */ (null);
			try {
				copyTextArea = document.createElement('textarea');
				copyTextArea.style.height = '0px';
				copyTextArea.style.opacity = '0';
				copyTextArea.style.width = '0px';
				document.body.appendChild(copyTextArea);
				copyTextArea.value = value;
				copyTextArea.select();
				document.execCommand('copy');
				this.native.showToast('已复制',500);
				resolve(value);
			}
			finally {
				if (copyTextArea && copyTextArea.parentNode) {
					copyTextArea.parentNode.removeChild(copyTextArea);
				}
			}
		});
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
		this.navCtrl.push('PaymentMethodPage', { order_id: id })
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
	buyAgain(order_id) {
		this.httpService.alignBuy({ order_id: order_id }).then((res) => {
			if (res.status) {
				this.navCtrl.push('CarPage');
			} else if (res.status == -2) {
				this.alertCtrl.create({
					title: '镜库科技',
					message: '购买需上传医疗器械许可证，是否上传',
					buttons: [
						{
							text: '确定',
							handler: () => {
								this.navCtrl.push('CompanyInfoPage');
							}
						},
						{
							text: '取消',
						}
					]
				}).present();
			}
		})
	}
	goAccountServicePage() {
		this.QimoChat.qimoChatSDK(this.data.order.access_id, this.data.order.suppliers_name, this.data.order.suppliers_logo, );
	}
}
