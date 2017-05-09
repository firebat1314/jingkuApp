import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PaymentMethodPage } from "./payment-method/payment-method";
import { OrdersDetailPage } from "./orders-detail/orders-detail";
import { WriteOrdersPage } from "./write-orders/write-orders";
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
  noSendData: any;
  noGetData: any;
  noPayData: any;
  allOrderData: any;
  pageIndex: number = 0;

  @ViewChild('mytabs') mytabs;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public native: Native
  ) {
    this.getHttpData();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AllOrdersPage');
  }
  getHttpData() {

    this.httpService.order().then((res) => {
      console.log(res);
      if (res.status == 1) {
        this.allOrderData = res;
      }
    })
    this.httpService.order({ type: 'pay' }).then((res) => {
      console.log(res);
      if (res.status == 1) {
        this.noPayData = res;
      }
    })
    this.httpService.order({ type: 'shi' }).then((res) => {
      console.log(res);
      if (res.status == 1) {
        this.noSendData = res;
      }
    })
    this.httpService.order({ type: 'dsh' }).then((res) => {
      console.log(res);
      if (res.status == 1) {
        this.noGetData = res;
      }
    })
  }
  checkTab($event) {
    this.pageIndex = $event;
  }
  ngAfterViewInit() {
    //进入页面默认选中标签
    if (this.navParams.get('index')) {
      this.pageIndex = this.navParams.get('index');
      this.mytabs.selectedIndex = this.navParams.get('index');
    }
  }
  goOrdersDetailPage(orderId) {
    this.navCtrl.push(OrdersDetailPage, { order_id: orderId });
  }
  goParticularsPage(id) {
    this.navCtrl.push(ParticularsPage, { goodsId: id });
  }
  page1: any = 1;
  page2: any = 1;
  page3: any = 1;
  page4: any = 1;
  doInfinite(infiniteScroll) {
    if (this.pageIndex == 0) {
      this.page1++;
      this.httpService.order({ page: this.page1 }).then((res) => {
        console.log(res);
        if (res.status == 1) {
          Array.prototype.push.apply(this.allOrderData.list, res.list);
        }
        setTimeout(() => {
          infiniteScroll.complete();
        }, 500);
      })
    } else if (this.pageIndex == 1) {
      this.page2++;
      this.httpService.order({ type: 'pay', page: this.page2 }).then((res) => {
        console.log(res);
        if (res.status == 1) {
          Array.prototype.push.apply(this.noPayData.list, res.list);
        }
        setTimeout(() => {
          infiniteScroll.complete();
        }, 500);
      })
    } else if (this.pageIndex == 2) {
      this.page3++;
      this.httpService.order({ type: 'shi', page: this.page3 }).then((res) => {
        console.log(res);
        if (res.status == 1) {
          Array.prototype.push.apply(this.noPayData.list, res.list);
        }
        setTimeout(() => {
          infiniteScroll.complete();
        }, 500);
      })
    } else if (this.pageIndex == 3) {
      this.page4++;
      this.httpService.order({ type: 'dsh', page: this.page4 }).then((res) => {
        console.log(res);
        if (res.status == 1) {
          Array.prototype.push.apply(this.noGetData.list, res.list);
        }
        setTimeout(() => {
          infiniteScroll.complete();
        }, 500);
      })
    } else if (this.pageIndex == 4) {
      setTimeout(() => {
        infiniteScroll.complete();
      }, 500);
    }
  }
  toPay(id) {
    this.httpService.pay({ log_id: id }).then((res) => {
      console.log(res);
      if (res.status == 1) {
        this.navCtrl.push(PaymentMethodPage, { data: res })
      }
    })
  }
  cancelOrder(order_id) {
    this.native.openAlertBox('取消订单操作', () => {
      this.httpService.cancelOrder({ order_id: order_id }).then((res) => {
        if(res.status==1){
          this.native.showToast('操作成功');
          this.getHttpData();
        }
      })
    })
  }
}
