import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, IonicPage, FabButton, Events, AlertController } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";
import { phone_nember } from '../../../providers/constants';
import { MineProvider } from '../../../providers/mine/mine';
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
  infiniteScroll: any;
  orderList: any;
  pageIndex: number = 0;
  orderData: any;
  orderData_all: any;
  orderData_unpay: any;
  orderData_unget: any;
  orderData_success: any;
  orderData_cancel: any;
  @ViewChild('mytabs') mytabs;
  @ViewChild(Content) content: Content;
  @ViewChild(FabButton) fabButton: FabButton;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public native: Native,
    public events: Events,
    private alertCtrl: AlertController,
    private mine: MineProvider,
  ) {
    this.events.subscribe('allOrders:update', () => {
      this.getByPageIndex();
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AllOrdersPage');
  }
  ionViewDidLeave(){
    this.infiniteScroll = null;
  }
  ngAfterViewInit() {
  }
  ngOnInit() {
    /* 回到顶部按钮 */
    this.fabButton.setElementClass('fab-button-out', true);
    this.content.ionScroll.subscribe((d) => {
      this.fabButton.setElementClass("fab-button-in", d.scrollTop >= d.contentHeight);
    });
    this.mytabs.slides = ['全部', '待付款', '待收货', '已完成', '已取消'];
    this.mytabs.pageNumber = 5;
    //进入页面默认选中标签
    if (this.navParams.get('index')) {
      this.pageIndex = this.navParams.get('index');//tab下标
      this.mytabs.selectedIndex = this.pageIndex;//切换tab标签
      this.getByPageIndex();
    } else {
      this.getByPageIndex();
    }
  }
  getByPageIndex() {
    if(this.infiniteScroll) this.infiniteScroll.enable(true);
    if (this.pageIndex == 0) {
      return this.httpService.order({ page: 1 }, { showLoading: true }).then((res) => {
        if (res.status == 1) {
          // this.orderData_all = res;
          this.orderData = res;
          this.orderList = res.list;
        }
      })
    } else if (this.pageIndex == 1) {
      return this.httpService.order({ page: 1, type: 'unpay' }, { showLoading: true }).then((res) => {
        if (res.status == 1) {
          // this.orderData_unpay= res;
          this.orderData = res;
          this.orderList = res.list;
        }
      })
    } else if (this.pageIndex == 2) {
      return this.httpService.order({ page: 1, type: 'collect' }, { showLoading: true }).then((res) => {
        if (res.status == 1) {
          // this.orderData_unget = res;
          this.orderData = res;
          this.orderList = res.list;
        }
      })
    } else if (this.pageIndex == 3) {
      return this.httpService.order({ page: 1, type: 'ok' }, { showLoading: true }).then((res) => {
        if (res.status == 1) {
          // this.orderData_success = res;
          this.orderData = res;
          this.orderList = res.list;
        }
      })
    } else if (this.pageIndex == 4) {
      return this.httpService.order({ page: 1, type: 'cancel' }, { showLoading: true }).then((res) => {
        if (res.status == 1) {
          // this.orderData_cancel = res;
          this.orderData = res;
          this.orderList = res.list;
        }
      })
    }
  }
  /*下拉刷新*/
  doRefresh(refresher) {
    this.getByPageIndex().then(() => {
      setTimeout(() => {
        refresher.complete();
      }, 500);
    })
  }
  checkTab($event) {
    this.infiniteScroll ? this.infiniteScroll.enable(true) : null;
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
    this.infiniteScroll = infiniteScroll;
    if (this.orderData.page < this.orderData.pages) {
      var p = this.orderData.page;
      this.httpService.order({ page: ++p, type: type }, { showLoading: false }).then((res) => {
        if (res.status == 1) {
          this.orderData = res;
          this.orderList = this.orderList.concat(res.list);
        }
        setTimeout(() => {
          this.infiniteScroll.complete();
        }, 500);
      })
    } else {
      this.infiniteScroll.enable(false);
    }
  }
  toPay(id) {
    if (!this.mine.canCheckout) { this.native.showToast('暂无结算权限，请联系企业管理员'); return false }
    
    this.navCtrl.push('PaymentMethodPage', { order_id: id })
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
  deleteOrder(id, index) {
    this.native.openAlertBox('删除订单', () => {
      this.httpService.delOrder({ order_id: id }).then((res) => {
        if (res.status == 1) {
          this.orderList.splice(index, 1);
          this.native.showToast(res.data);
        }
      })
    })
  }
  goParticularsHomePage(id) {
    this.navCtrl.push('ParticularsHomePage', { suppliersId: id })
  }
  goAddProcess(order_parent) {
    this.navCtrl.push('AddProcessPage', { order_parent: order_parent })
    // this.native.showToast('暂未开放',null,false);
  }
  buyAgain(order_id) {
    this.httpService.alignBuy({ order_id: order_id }).then((res) => {
      if (res.status) {
        this.navCtrl.push('CarPage');
      }else if(res.status==-2){
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
}
