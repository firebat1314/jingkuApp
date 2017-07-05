import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, IonicPage } from 'ionic-angular';
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
    public native: Native

  ) {
    this.doRefresh();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountCollectStorePage');
  }
  /*下拉刷新*/
  doRefresh(refresher?) {
    this.httpService.collectionShop({ size: 10 }).then((res) => {
      console.log('收藏店铺列表', res)
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
        console.log(res);
        if (res.status == 1) {
          this.native.showToast('已取消关注~')
          this.doRefresh();
        }
      })
    })
  }

  flag: boolean = true;
  doInfinite(infiniteScroll) {
    if (this.collectionShop.page < this.collectionShop.pages) {
      this.collectionShop.page++;
    } else {
      this.flag = false;
      return;
    }
    this.httpService.collectionShop({ page: this.collectionShop.page }).then((res) => {
      console.log(res);
      if (res.status == 1) {
        Array.prototype.push.apply(this.collectionShop.list, res.list);
      }
      setTimeout(() => {
        infiniteScroll.complete();
      }, 500);
    })
  }
  scrollToTop() {
    this.content.scrollToTop();
  }
}
