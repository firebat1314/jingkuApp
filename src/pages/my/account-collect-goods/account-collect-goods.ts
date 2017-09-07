import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";

@IonicPage()
@Component({
  selector: 'page-account-collect-Goods',
  templateUrl: 'account-collect-Goods.html'
})
export class AccountCollectGoodsPage {
  collectionList: any;

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
    console.log('ionViewDidLoad AccountCollectGoodsPage');
  }
  /*下拉刷新*/
  doRefresh(refresher?) {
    this.httpService.collectionList({ size: 10, page: 1 }).then((res) => {
      // console.log('收藏店商品列表', res)
      if (res.status == 1) { this.collectionList = res; }
      if (refresher) {
        setTimeout(() => {
          refresher.complete();
        }, 500);
      }
    })
  }
  unfollowGoods(goods_id, index) {
    this.native.openAlertBox('取消关注改商铺?', () => {
      this.httpService.delCollectionGoods({ rec_ids: [goods_id] }).then((res) => {
        // console.log(res);
        if (res.status == 1) {
          this.native.showToast('已取消关注')
          this.doRefresh();
        }
      })
    })
  }
  joinCar(goods_id) {
    this.navCtrl.push('ParticularsPage', { goodsId: goods_id });
  }

  doInfinite(infiniteScroll) {
    var page = this.collectionList.page;
    if (page < this.collectionList.pages) {
      this.httpService.collectionList({ size: 10,page: ++page }).then((res) => {
        if (res.status == 1) {
          this.collectionList.page = res.page;
          Array.prototype.push.apply(this.collectionList.data, res.data);
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
