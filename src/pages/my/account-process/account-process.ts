import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { HttpService } from '../../../providers/http-service';

/*
  Generated class for the AccountProcess page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountProcessPage');
  }
  ngOnInit() {
    this.checkList();
  }
  checkList() {
    if (this.infiniteScroll) this.infiniteScroll.enable(true);
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
    if (this.data.page < this.data.pages) {
      this.httpService.machining(Object.assign({ page: ++this.data.page }, data)).then((res) => {
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
    this.navCtrl.push('WatchPage', { mid: mid })
  }
  toPay(id) {
    this.navCtrl.push('PaymentMethodPage', { log_id: id, type: 'mach' })
  }
}
