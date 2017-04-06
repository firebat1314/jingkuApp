import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";

@Component({
  selector: 'page-account-collect-store',
  templateUrl: 'account-collect-store.html'
})
export class AccountCollectStorePage {
  collectionShop: any;

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
}
