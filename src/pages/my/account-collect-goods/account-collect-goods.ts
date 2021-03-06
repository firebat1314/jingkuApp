import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, IonicPage, Events } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";
import { MineProvider } from '../../../providers/mine/mine';

@IonicPage()
@Component({
  selector: 'page-account-collect-Goods',
  templateUrl: 'account-collect-Goods.html'
})
export class AccountCollectGoodsPage {
  infiniteScroll: any;
  collectionList: any;

  @ViewChild(Content) content: Content
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public native: Native,
    public events: Events,
    public mine: MineProvider,
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountCollectGoodsPage');
  }
  ngOnInit() {
    this.getData();
  }
  getData(showLoading = true) {
    return this.httpService.collectionList({ size: 10, page: 1 }, { showLoading: showLoading }).then((res) => {
      if (res.status == 1) { this.collectionList = res; }
    })
  }
  /*下拉刷新*/
  doRefresh(refresher) {
    if (this.infiniteScroll) this.infiniteScroll.enable(true);
    this.getData(false).then(() => {
      setTimeout(() => {
        refresher.complete();
      }, 500);
    })
  }
  unfollowGoods(goods_id, index) {
    this.native.openAlertBox('取消关注', () => {
      this.httpService.delCollectionGoods({ rec_ids: [goods_id] }).then((res) => {
        // console.log(res);
        if (res.status == 1) {
          this.getData();
          this.events.publish('my:update');
        }
      })
    })
  }
  joinCar(e, goods_id) {
    e.stopPropagation();
    this.navCtrl.push('ParticularsPage', { goodsId: goods_id });
  }

  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    var page = this.collectionList.page;
    if (page < this.collectionList.pages) {
      this.httpService.collectionList({ size: 10, page: ++page }, { showLoading: false }).then((res) => {
        if (res.status == 1) {
          this.collectionList.page = res.page;
          Array.prototype.push.apply(this.collectionList.data, res.data);
        }
        setTimeout(() => {
          this.infiniteScroll.complete();
        }, 500);
      })
    } else {
      this.infiniteScroll.enable(false);
    }
  }
  scrollToTop() {
    this.content.scrollToTop();
  }
}
