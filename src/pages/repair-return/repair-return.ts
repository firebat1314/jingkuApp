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
  @ViewChild(Content) content: Content;
  @ViewChild(FabButton) fabButton: FabButton;

  orderRepair: Array<any> = [];//售后申请列表
  repairList: Array<any>;//申请记录列表

  applyTabs: string = 'apply' || 'applyLog';
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
  getOrderRepair(infiniteScroll?) {
    this.httpService.orderRepair({
      size: 1,
      page: 1
    }).then((res) => {
      if (res.status == 1) {
        this.orderRepair = this.orderRepair.concat(res.list);

        if (infiniteScroll) {
          setTimeout(() => {
            infiniteScroll.complete();
          }, 500);
        }

      }
    })
  }
  getRepairList() {
    this.httpService.repairList().then((res) => {
      if (res.status == 1) {
        this.repairList = res.list;
      }
    })
  }
  doRefresh(refresher) {
    if (this.applyTabs == 'apply') {
      this.orderRepair = [];
      this.getOrderRepair();
    }
    if (this.applyTabs == 'applyLog') {
      this.repairList = [];
      this.getRepairList();
    }
    setTimeout(() => {
      refresher.complete();
    }, 500);
  }
  doInfinite(infiniteScroll) {
    this.getOrderRepair(infiniteScroll);
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
        this.navCtrl.push('ApplyServicePage',res)
      }
    })
  }
  /**
   * 复选框选中判断
   * @param subitem 订单项
   */
  checkbox(subitem){
    // for ( var i in subitem.goods){
    //   if(subitem.goods[i].selected==false){
    //     subitem.selected = false;
    //   }
    // }
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

}