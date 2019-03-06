import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, Events } from 'ionic-angular';
import { HttpService } from '../../../providers/http-service';
import { MineProvider } from '../../../providers/mine/mine';
import { Native } from '../../../providers/native';

/*
  Generated class for the AccountProcess page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage({
  segment: 'account-process/:sn'
})
@Component({
  selector: 'page-account-process',
  templateUrl: 'account-process.html'
})
export class AccountProcessPage {
  infiniteScroll: any;
  data: any;
  /**
   * 1：可以加工
   * 2：未支付
   * 3：已支付
   * 4：已完成
   */
  jgSegment: number = 1;
  sn: any;
  isReturns: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public events: Events,
    public native: Native,
    public mine: MineProvider,
  ) {
    this.sn = navParams.get('sn') && this.navParams.get('sn') != ":sn" ? this.navParams.get('sn').split('-')[0] : false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountProcessPage');
  }
  ngOnInit() {

    this.events.subscribe('AccountProcessPage', () => {
      this.checkList();
    })
    if (this.sn&&this.native.isMobileweb()) {
      this.httpService.barCodeInfo({ sn: this.sn }).then(res => {
        if (res.status == 1) {
          if (res.CodeInfo.type === '0') {//来镜加工
            this.isReturns = false;
            if (res.CodeInfo.target_id > 0) {//条码已被绑定跳对应详情
              this.native.showToast('该条码已被绑定');
              this.navCtrl.setPages([{ page: 'WatchPage', params: { mid: res.CodeInfo.target_id } }]);
            } else {
              this.checkList();
            }
          } else if (res.CodeInfo.type === '1') {//退换货
            this.isReturns = true;
            if (res.CodeInfo.target_id > 0) {//条码已被绑定跳对应详情
              this.native.showToast('该条码已被绑定');
              this.navCtrl.setPages([{ page: 'ServiceOrderDetailsPage', params: { return_id: res.CodeInfo.target_id } }]);
            } else {
              this.checkList();
            }
          }
        }
      })
    } else {
      this.checkList();
    }
  }
  ngOnDestroy() {
    this.events.unsubscribe('AccountProcessPage');
    this.events.unsubscribe('repair-return:update');
  }
  checkList() {
    if (this.infiniteScroll) this.infiniteScroll.enable(true);
    if (this.sn) {
      this.events.subscribe('repair-return:update', () => {
        this.httpService.barCodeList({ sn: this.sn }, { showLoading: false }).then(res => {
          if (res.status == 1) {
            this.data = res;
          }
        })
      });
      return this.httpService.barCodeList({ sn: this.sn }).then(res => {
        if (res.status == 1) {
          this.data = res;
        } else {
          this.navCtrl.pop().catch(() => {
            this.navCtrl.goToRoot({ animate: true });
          })
        }
      })
    }
    if (this.jgSegment == 1) {//
      return this.httpService.machining({ page: 1 }).then((res) => {
        if (res.status == 1) {
          this.data = res;
        }
      })
    } else if (this.jgSegment == 2) {
      return this.httpService.machining({ pay: -1, page: 1 }).then((res) => {
        if (res.status == 1) {
          this.data = res;
        }
      })
    } else if (this.jgSegment == 3) {
      return this.httpService.machining({ pay: 1, page: 1 }).then((res) => {
        if (res.status == 1) {
          this.data = res;
        }
      })
    } else if (this.jgSegment == 4) {
      return this.httpService.machining({ ok: 1, page: 1 }).then((res) => {
        if (res.status == 1) {
          this.data = res;
        }
      })
    }
  }
  /*下拉刷新*/
  doRefresh(refresher) {
    this.checkList().then(() => {
      setTimeout(() => {
        refresher.complete();
      }, 500);
    })
  }
  doInfinite(infiniteScroll) {
    if (this.jgSegment == 1) {
      this.scroll(infiniteScroll)
    } else if (this.jgSegment == 2) {
      this.scroll(infiniteScroll, { pay: -1 })
    } else if (this.jgSegment == 3) {
      this.scroll(infiniteScroll, { pay: 1 })
    } else if (this.jgSegment == 4) {
      this.scroll(infiniteScroll, { ok: 1 })
    }
  }
  scroll(infiniteScroll, data?) {
    this.infiniteScroll = infiniteScroll;
    if (this.sn) {
      this.infiniteScroll.enable(false);
      return;
    }
    if (this.data.page < this.data.pages) {
      this.httpService.machining(Object.assign({ page: ++this.data.page }, data), { showLoading: false }).then((res) => {
        if (res.status == 1) {
          Array.prototype.push.apply(this.data.list, res.list);
        }
        setTimeout(() => {
          this.infiniteScroll.complete();
        }, 500);
      })
    } else {
      this.infiniteScroll.enable(false);
    }
  }
  goParticularsPage(goods_id) {
    this.navCtrl.push('ParticularsPage', { goodsId: goods_id })
  }
  goWatchPage(mid) {
    if (this.isReturns) {
      this.navCtrl.push('ServiceOrderDetailsPage', { return_id: mid })
    } else {
      this.navCtrl.push('WatchPage', { mid: mid })
    }
  }
  toPay(id) {
    this.navCtrl.push('PaymentMethodPage', { log_id: id, type: 'mach' })
  }
  /* 绑定编码 */
  barCodeBinding(id) {
    this.httpService.barCodeBinding({ sn: this.sn, id: id }).then(res => {
      if (res.status == 1) {
        this.native.showToast(res.info);
        this.navCtrl.pop().catch(() => {
          this.navCtrl.goToRoot({ animate: true });
        })
      }
    })
  }
}
