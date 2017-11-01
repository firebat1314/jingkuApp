import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, FabButton, Events, ActionSheetController } from 'ionic-angular';
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
  infiniteScroll: any;//下拉刷新对象
  repair: any;//售后申请
  order: any;//申请记录

  applyTabs: string = 'apply' || 'applyLog';

  options = {
    size: 10,
    page: 1,
    order_sn: null
  };

  // rec_ids: Array<string>;
  // order_ids: Array<string>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public native: Native,
    public events: Events,
    public actionSheetCtrl: ActionSheetController
  ) { }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RepairReturnPage');
    this.checkList();
    this.events.subscribe('repair-return:update', () => {
      this.checkList();
    })
  }
  ngOnDestroy() {
    this.events.unsubscribe('repair-return:update');
  }
  checkList() {
    if (this.infiniteScroll) this.infiniteScroll.enable(true);
    if (this.applyTabs == 'apply') {
      return this.httpService.orderRepair(this.options).then((res) => {
        if (res.status == 1) {
          this.order = res;
        }
      })
    } else if (this.applyTabs == 'applyLog') {
      return this.httpService.repairList(this.options).then((res) => {
        if (res.status == 1) {
          this.repair = res;
        }
      })
    }
  }
  searchOrder(e) {
    if (e.keyCode == 13) {
      this.checkList();
    }
  }
  doRefresh(refresher) {
    this.checkList().then((res) => {
      setTimeout(() => {
        refresher.complete();
      }, 500);
    });
  }
  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    if (this.applyTabs == 'apply') {
      if (this.order.page < this.order.pages) {
        this.httpService.orderRepair({ page: ++this.order.page, size: 10 }).then((res) => {
          if (res.status == 1) {
            Array.prototype.push.apply(this.order.list, res.list);
            this.infiniteScroll.complete();
          }
        })
      } else {
        this.infiniteScroll.enable(false);
      }
    }
    if (this.applyTabs == 'applyLog') {
      if (this.repair.page < this.repair.pages) {
        this.httpService.repairList({ page: ++this.repair.page, size: 10 }).then((res) => {
          if (res.status == 1) {
            Array.prototype.push.apply(this.repair.list, res.list);
            this.infiniteScroll.complete();
          }
        })
      } else {
        this.infiniteScroll.enable(false);
      }
    }
  }
  /**
   * 点击申请售后
   * @param order_id 订单id
   * @param goods 订单商品列表
   */
  goApplyServicePage(order_id, rec_id) {
    var rec_ids = [rec_id];

    this.navCtrl.push('ApplyServicePage', {
      order_ids: order_id,
      rec_ids: rec_id
    })
  }
  /**
   * 复选框选中判断
   * @param subitem 订单项
   */
  order_ids: Array<any> = [];
  PL:boolean;
  checkbox(subitem) {
/*     var index = this.order_ids.indexOf(subitem.order_id)
    if (index > -1) {
      this.order_ids.splice(index, 1)
    } else {
      this.order_ids.push(subitem.order_id);
    }
    if(this.order_ids.length>0){
      this.PL = true;
    }else{
      this.PL = false;
    } */
  }
  checkall(item) {

  }
  /**
   * 批量申请售后
   * @param 
   */
  submitAll() {
    let order_ids = [];
    let rec_ids = [];
    for (var i in this.order.list) {
      if (this.order.list[i].selected) {
        order_ids.push(this.order.list[i].order_id);
        rec_ids.push(this.order.list[i].rec_id);
      }
    }
    if(!order_ids.length||!rec_ids.length){
      this.native.showToast('请选择订单');
      return;
    }
    let actionSheet = this.actionSheetCtrl.create({
      title: '服务类型',
      buttons: [
        {
          text: '退货',
          role: '',
          handler: () => {
            console.log('1');
            this.httpService.isGoodsRepair({
              orders: {
                order_ids: order_ids.join(','),
                rec_ids: rec_ids.join(',')
              }, type: 1
            }).then((res) => {
              if (res.status) {
                this.navCtrl.push('ApplyServicePage', {
                  order_ids: order_ids.join(','), rec_ids: rec_ids.join(','), type: 1
                });
              }
            })
          }
        }, {
          text: '换货',
          handler: () => {
            console.log('2');
            this.httpService.isGoodsRepair({
              orders: {
                order_ids: order_ids.join(','),
                rec_ids: rec_ids.join(',')
              }, type: 2
            }).then((res) => {
              if (res.status) {
                this.navCtrl.push('ApplyServicePage', {
                  order_ids: order_ids.join(','), rec_ids: rec_ids.join(','), type: 2
                });
              }
            })
          }
        }, {
          text: '维修',
          handler: () => {
            console.log('3');
            this.httpService.isGoodsRepair({
              orders: {
                order_ids: order_ids.join(','),
                rec_ids: rec_ids.join(',')
              }, type: 3
            }).then((res) => {
              if (res.status) {
                this.navCtrl.push('ApplyServicePage', {
                  order_ids: order_ids.join(','), rec_ids: rec_ids.join(','), type: 3
                });
              }
            })
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  }
  clickWarn(e) {
    e.stopPropagation();
    this.native.showToast('该商品不可售后');
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
          this.checkList();
        }
      })
    })
  }
  goServiceOrderDetailsPage(return_id) {
    this.navCtrl.push('ServiceOrderDetailsPage', { return_id: return_id });
  }
}