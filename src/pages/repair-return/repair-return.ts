import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, FabButton } from 'ionic-angular';
import { HttpService } from "../../providers/http-service";
import { Native } from "../../providers/native";

/**
 * Generated class for the RepairReturnPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-repair-return',
  templateUrl: 'repair-return.html',
})
export class RepairReturnPage {
  repair: any;
  order: any;
  @ViewChild(Content) content: Content;
  @ViewChild(FabButton) fabButton: FabButton;

  applyTabs: string = 'apply' || 'applyLog';

  options = {
    size: 10,
    page: 1,
    order_sn: null
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public native: Native,
  ) { }
  ngAfterViewInit() {
    this.content.ionScroll.subscribe((d) => {
      this.fabButton.setElementClass("fab-button-out", d.directionY == "down");
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RepairReturnPage');
    this.getOrderRepair();
    this.getRepairList();
  }
  getOrderRepair(refresher?) {
    this.httpService.orderRepair(this.options).then((res) => {
      if (res.status == 1) {
        this.order = res;
        refresher ? refresher() : null;
      }
    })
  }
  getRepairList(refresher?) {
    this.httpService.repairList(this.options).then((res) => {
      if (res.status == 1) {
        this.repair = res;
        refresher ? refresher() : null;
      }
    })
  }
  searchOrder() {
    this.getOrderRepair();
    this.getRepairList();
  }
  doRefresh(refresher) {
    var fun = () => {
      setTimeout(() => {
        refresher.complete();
      }, 500);
    }
    if (this.applyTabs == 'apply') {
      this.getOrderRepair(fun);
    }
    if (this.applyTabs == 'applyLog') {
      this.getRepairList(fun);
    }

  }
  doInfinite(infiniteScroll) {
    if (this.applyTabs == 'apply') {
      if (this.order.page < this.order.pages) {
        this.httpService.orderRepair({ page: ++this.order.page, size: 10 }).then((res) => {
          if (res.status == 1) {
            this.order = res;
            Array.prototype.push.apply(this.order.list, res.list);
            infiniteScroll.complete();
          }
        })
      } else {
        infiniteScroll.complete();
      }
    }
    if (this.applyTabs == 'applyLog') {
      if (this.repair.page < this.repair.pages) {
        this.httpService.repairList({ page: ++this.repair.page, size: 10 }).then((res) => {
          if (res.status == 1) {
            this.repair = res;
            Array.prototype.push.apply(this.repair.list, res.list);
            infiniteScroll.complete();
          }
        })
      } else {
        infiniteScroll.complete();
      }
    }
  }
  /**
   * 点击申请售后
   * @param order_id 订单id
   * @param goods 订单商品列表
   */
  goApplyServicePage(order_id, goods) {
    var rec_ids = [];
    if (goods.length) for (let i = 0; i < goods.length; i++) {
      if (goods[i].selected) {
        rec_ids.push(goods[i].rec_id);
      }
    }
    if (!rec_ids.length) {
      this.native.showToast('请选择商品');
      return
    }
    this.httpService.repairApply({
      order_id: order_id,
      rec_id: rec_ids
    }).then((res) => {
      if (res.status == 1) {
        this.navCtrl.push('ApplyServicePage', { data: res })
      }
    })
  }
  /**
   * 复选框选中判断
   * @param subitem 订单项
   */
  checkbox(subitem) {
   /*  subitem.selected = true
    for (var i in item.goods) {
      if (item.goods[i].selected == false) {
        item.selected = true;
      }
    }
    console.log(this.order.list[0]) */
  }
  checkall(item) {

  }
  /**
   * 取消售后申请
   * @param id 
   */
  cancelApply(id) {
    this.native.openAlertBox('确认取消本次售后申请吗？', () => {
      this.httpService.cancelReturn({ id: id }).then((res) => {
        if (res.status == 1) {
          this.native.showToast('取消成功');
          this.getRepairList();
        }
      })
    })
  }
  goServiceOrderDetailsPage(return_id) {
    this.navCtrl.push('ServiceOrderDetailsPage', { return_id: return_id });
  }
}