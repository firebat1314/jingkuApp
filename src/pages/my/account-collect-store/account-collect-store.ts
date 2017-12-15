import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, IonicPage, Events } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";

@IonicPage()
@Component({
  selector: 'page-account-collect-store',
  templateUrl: 'account-collect-store.html'
})
export class AccountCollectStorePage {
  collectionShop: any;

  @ViewChild(Content) content: Content
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public events: Events,
    public native: Native
  ) { }
  ngOnInit() {
    this.doRefresh();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountCollectStorePage');
  }
  /*下拉刷新*/
  doRefresh(refresher?) {
    this.httpService.collectionShop({ size: 10, page: 1 }).then((res) => {
      if (res.status == 1) { this.collectionShop = res; }
      if (refresher) {
        setTimeout(() => {
          refresher.complete();
        }, 500);
      }
    })
  }
  unfollowShop(suppliers_id, index) {
    this.native.openAlertBox('是否取消关注改商铺', () => {
      this.httpService.delCollectionShop({ shop_ids: [suppliers_id] }).then((res) => {
        // console.log(res);
        if (res.status == 1) {
          this.native.showToast('已取消关注', null, false);
          this.doRefresh();
          this.events.publish('my:update');
        }
      })
    })
  }

  doInfinite(infiniteScroll) {
    if (this.collectionShop.page < this.collectionShop.pages) {
      this.httpService.collectionShop({ page: ++this.collectionShop.page }).then((res) => {
        // console.log(res);
        if (res.status == 1) {
          Array.prototype.push.apply(this.collectionShop.list, res.list);
        }
        setTimeout(() => {
          infiniteScroll.complete();
        }, 500);
      })
    } else {
      infiniteScroll.enable(false);
    }

  }
  scrollToTop() {
    this.content.scrollToTop();
  }
}
