import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpService } from '../../../../providers/http-service';

/**
 * Generated class for the OrderPayOverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'order-pay-over/:order_id/:log_id/:type'
})
@Component({
  selector: 'page-order-pay-over',
  templateUrl: 'order-pay-over.html',
})
export class OrderPayOverPage {
  is_machining_order: boolean;
  data: any;

  order_id = this.navParams.get('order_id');
  log_id = this.navParams.get('log_id');
  type = this.navParams.get('type');
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private httpService: HttpService,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPayOverPage');
  }
  ngOnInit() {
    this.getData();
    this.updateEvents();
  }
  updateEvents() {//支付完成后更新个人中心订单等信息
    this.events.publish('allOrders:update');
    this.events.publish('AccountProcessPage');
    this.events.publish('my:update');
  }
  getData() {
    this.httpService.orderPayOver({
      order_id: this.order_id,
      log_id: this.log_id,
      type: this.type,
    }).then((res) => {
      if (res.status) this.data = res;
    });
    this.httpService.is_machining_order({ order_id: this.order_id }).then((res) => {
      if (res.status || res.info == '成功') {
        this.is_machining_order = true;
      }
    })
  }
  goAllorder() {
    
    if (this.navCtrl.getPrevious() && (this.navCtrl.getPrevious().id == 'AllOrdersPage'||this.navCtrl.getPrevious().id == 'OrderListDistributionPage')) {
      this.navCtrl.pop().catch(res => { history.back() });
    } else {
      if(this.data.order_info.extension_code == 'distribution'){
        this.pushPage('OrderListDistributionPage');
      }else{
        this.pushPage('AllOrdersPage');
      }
    }
  }
  goAddProcessPage() {
    this.pushPage('AddProcessPage', { order_parent: this.order_id });
  }
  goAccountProcessPage() {
    if (this.navCtrl.getPrevious() && this.navCtrl.getPrevious().id == 'AccountProcessPage') {
      this.navCtrl.pop().catch(res => { history.back() });
    } else {
      this.pushPage('AccountProcessPage');
    }
  }
  pushPage(page, params = {}) {
    var nav = this.navCtrl.last();
    this.navCtrl.push(page, params).then(() => {
      this.navCtrl.removeView(nav, { animate: false });
    });
  }
  goHome() {
    this.navCtrl.goToRoot({ animate: true });
    this.navCtrl.parent.select(0);
  }
  collectStore(item) {
    if (item.supp_select) {
      this.httpService.CollectShop({ id: item.suppliers_id, type: 0 }).then((res) => {
        if (res.status) {
          item.supp_select = 0;
        }
      })
    } else {
      this.httpService.CollectShop({ id: item.suppliers_id, type: 1 }).then((res) => {
        if (res.status) {
          item.supp_select = 1;
        }
      })
    }
  }
}
