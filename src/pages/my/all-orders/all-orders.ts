import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { PaymentMethodPage } from "./payment-method/payment-method";
import { OrdersDetailPage } from "./orders-detail/orders-detail";
// import { WriteOrdersPage } from "./write-orders/write-orders";
import { HttpService } from "../../../providers/http-service";
import { ParticularsPage } from "../../home/particulars/particulars";
import { Native } from "../../../providers/native";
/*
  Generated class for the AllOrders page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-all-orders',
  templateUrl: 'all-orders.html'
})
export class AllOrdersPage {
  pageIndex: number = 0;
  orderData: any;
  @ViewChild('mytabs') mytabs;
  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public native: Native
  ) { }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AllOrdersPage');
  }
  ngAfterViewInit() {
    //进入页面默认选中标签
    if (this.navParams.get('index')) {
      this.pageIndex = this.navParams.get('index');
      this.mytabs.selectedIndex = this.pageIndex;
      this.getByPageIndex();
    } else {
      this.getByPageIndex();
    }
  }
  getHttpData() {
    this.httpService.order({ page: 1 }).then((res) => {
      if (res.status == 1) {
        this.orderData = res;
      }
    })
  }
  getByPageIndex() {
    if (this.pageIndex == 0) {
      this.httpService.order({ page: 1 }).then((res) => {
        if (res.status == 1) {
          this.orderData = res;
        }
      })
    } else if (this.pageIndex == 1) {
      this.httpService.order({ page: 1, type: 'pay' }).then((res) => {
        if (res.status == 1) {
          this.orderData = res;
        }
      })
    } else if (this.pageIndex == 2) {
      this.httpService.order({ page: 1, type: 'shi' }).then((res) => {
        if (res.status == 1) {
          this.orderData = res;
        }
      })
    } else if (this.pageIndex == 3) {
      this.httpService.order({ page: 1, type: 'dsh' }).then((res) => {
        if (res.status == 1) {
          this.orderData = res;
        }
      })
    } else if (this.pageIndex == 4) {
    }
  }

  checkTab($event) {
    this.flag = true;
    this.pageIndex = $event;
    this.content.scrollToTop();
    this.getByPageIndex();
  }
  goOrdersDetailPage(orderId) {
    this.navCtrl.push(OrdersDetailPage, { order_id: orderId });
  }
  goParticularsPage(id) {
    this.navCtrl.push(ParticularsPage, { goodsId: id });
  }

  flag: boolean = true;
  doInfinite(infiniteScroll) {
    if (this.pageIndex == 0) {
      this.infiniteScrollq(infiniteScroll, '')
    } else if (this.pageIndex == 1) {
      this.infiniteScrollq(infiniteScroll, 'pay')
    } else if (this.pageIndex == 2) {
      this.infiniteScrollq(infiniteScroll, 'shi')
    } else if (this.pageIndex == 3) {
      this.infiniteScrollq(infiniteScroll, 'dsh')
    } else if (this.pageIndex == 4) {
    }
  }
  infiniteScrollq(infiniteScroll, type) {
    if (this.orderData.page < this.orderData.pages) {
      this.httpService.order({ page: ++this.orderData.page, type: type }).then((res) => {
        if (res.status == 1) {
          Array.prototype.push.apply(this.orderData.list, res.list);
        }
        setTimeout(() => {
          infiniteScroll.complete();
        }, 500);
      })
    } else {
      this.flag = false;
    }
  }
  toPay(id) {
    this.httpService.pay({ order_id: id }).then((res) => {
      console.log(res);
      if (res.status == 1) {
        this.navCtrl.push(PaymentMethodPage, { data: res })
      }
    })
  }
  confirmReceipt(order_id) {
    this.native.openAlertBox('确认收货', () => {
      this.httpService.affirmReceived({ order_id: order_id }).then((res) => {
        if (res.status == 1) {
          this.native.showToast('订单操作成功');
          this.getByPageIndex();
        }
      })
    })
  }
  orderTracking(order_id) {
    this.native.showToast('敬请期待');
  }
  cancelOrder(order_id) {
    this.native.openAlertBox('取消订单操作', () => {
      this.httpService.cancelOrder({ order_id: order_id }).then((res) => {
        if (res.status == 1) {
          this.native.showToast('订单操作成功');
          this.getByPageIndex();
        }
      })
    })
  }
  deleteOrder(id) {
    this.native.openAlertBox('删除订单', () => {
      this.httpService.delOrder({ order_id: id }).then((res) => {
        if (res.status == 1) {
          this.native.showToast(res.data);
          this.getByPageIndex();
        }
      })
    })

  }
}
