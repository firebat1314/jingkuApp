import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";
import { ParticularsPage } from "../../home/particulars/particulars";

@Component({
  selector: 'page-account-collect-Goods',
  templateUrl: 'account-collect-Goods.html'
})
export class AccountCollectGoodsPage {
  collectionList: any;

  @ViewChild(Content) content:Content
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
      console.log('收藏店商品列表', res)
      if (res.status == 1) { this.collectionList = res; }
      if (refresher) {
        setTimeout(() => {
          refresher.complete();
        }, 500);
      }
    })
  }
  unfollowGoods(goods_id, index) {
    this.native.openAlertBox('确认取消关注改商铺', () => {
      this.httpService.delCollectionGoods({ rec_ids: [goods_id] }).then((res) => {
        console.log(res);
        if (res.status == 1) {
          this.native.showToast('已取消关注~')
          this.doRefresh();
        }
      })
    })
  }
  joinCar(goods_id) {
    this.navCtrl.push(ParticularsPage, { goodsId: goods_id });
  }

  flag: boolean = true;
  doInfinite(infiniteScroll) {
    if (this.collectionList.page < this.collectionList.pages) {
      this.collectionList.page++;
    } else {
      this.flag = false;
      return;
    }
    this.httpService.collectionList({ page: this.collectionList.page }).then((res) => {
      console.log(res);
      if (res.status == 1) {
        Array.prototype.push.apply(this.collectionList.list, res.list);
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
