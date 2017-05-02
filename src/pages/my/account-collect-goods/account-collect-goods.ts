import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";
import { ParticularsPage } from "../../home/particulars/particulars";

@Component({
  selector: 'page-account-collect-Goods',
  templateUrl: 'account-collect-Goods.html'
})
export class AccountCollectGoodsPage {
  collectionList: any;
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
    this.httpService.collectionList({ size: 10 }).then((res) => {
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
  joinCar(goods_id){
    this.navCtrl.push(ParticularsPage,{goodsId:goods_id});
  }
}
