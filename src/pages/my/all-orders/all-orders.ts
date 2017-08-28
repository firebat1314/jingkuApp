import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, IonicPage, FabButton } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";
/*
  Generated class for the AllOrders page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-all-orders',
  templateUrl: 'all-orders.html'
})
export class AllOrdersPage {
  pageIndex: number = 0;
  orderData: any;
  @ViewChild('mytabs') mytabs;
  @ViewChild(Content) content: Content;
  @ViewChild(FabButton) fabButton: FabButton;

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
    /* 回到顶部按钮 */
    this.fabButton.setElementClass('fab-button-out',true);
    this.content.ionScroll.subscribe((d) => {
      this.fabButton.setElementClass("fab-button-in", d.scrollTop >= d.contentHeight);
    });
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
      this.httpService.order({ page: 1, type: 'unpay' }).then((res) => {
        if (res.status == 1) {
          this.orderData = res;
        }
      })
    } else if (this.pageIndex == 2) {
      this.httpService.order({ page: 1, type: 'collect' }).then((res) => {
        if (res.status == 1) {
          this.orderData = res;
        }
      })
    } else if (this.pageIndex == 3) {
      this.httpService.order({ page: 1, type: 'ok' }).then((res) => {
        if (res.status == 1) {
          this.orderData = res;
        }
      })
    } else if (this.pageIndex == 4) {
      this.httpService.order({ page: 1, type: 'cancel' }).then((res) => {
        if (res.status == 1) {
          this.orderData = res;
        }
      })
    }
  }

  checkTab($event) {
    this.flag = true;
    this.pageIndex = $event;
    this.content.scrollToTop(0);
    this.getByPageIndex();
  }
  goOrdersDetailPage(orderId) {
    this.navCtrl.push('OrdersDetailPage', { order_id: orderId });
  }
  goParticularsPage(id) {
    this.navCtrl.push('ParticularsPage', { goodsId: id });
  }

  flag: boolean = true;
  doInfinite(infiniteScroll) {
    if (this.pageIndex == 0) {
      this.infiniteScrollq(infiniteScroll, '')
    } else if (this.pageIndex == 1) {
      this.infiniteScrollq(infiniteScroll, 'unpay')
    } else if (this.pageIndex == 2) {
      this.infiniteScrollq(infiniteScroll, 'collect')
    } else if (this.pageIndex == 3) {
      this.infiniteScrollq(infiniteScroll, 'ok')
    } else if (this.pageIndex == 4) {
      this.infiniteScrollq(infiniteScroll, 'cancel')
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
        this.navCtrl.push('PaymentMethodPage', { data: res })
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
    this.native.openAlertBox('是否取消订单', () => {
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
  goParticularsHomePage(id){
    this.navCtrl.push('ParticularsHomePage',{suppliersId:id})
  }
}
