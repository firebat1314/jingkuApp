import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, Slides, Searchbar, Nav } from 'ionic-angular';

import { SubnavPage1Page } from './subnav-page1/subnav-page1'
import { HttpService } from "../../providers/http-service";
import { MoreBrandPage } from "./more-brand/more-brand";
import { ParticularsPage } from "../home/particulars/particulars";
import { Native } from "../../providers/native";
/*
  Generated class for the Classify page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classify',
  templateUrl: 'classify.html'
})
export class ClassifyPage {
  collectionList: any;
  collectionShop: any;
  getCategorys: any;
  classSelect: any = 'classify';//brand or classify or care
  careSelect: any = 'shop';//shop or goods
  root = SubnavPage1Page;
  showBackBtn: boolean = false;
  showCheckBox: boolean = false;


  @ViewChild('mySearchBar') mySearchBar: Searchbar;
  @ViewChild('myNav') myNav: Nav;
  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public native: Native
  ) {
    this.getHttpData();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifyPage');
  }
  ngAfterViewInit() {
    setInterval(() => {
      if (this.classSelect == "classify") {
        if (!this.myNav.canGoBack()) {
          this.showBackBtn = false;
        } else {
          this.showBackBtn = true;
        }
      }
    }, 1000)
  }
  ngOnDestroy() {
    this.showCheckBox = false;
  }
  getHttpData(finished?) {
    this.httpService.getCategorys().then((res) => {
      console.log('获取九大分类', res)
      if (res.status == 1) { this.getCategorys = res.data; }
      this.httpService.collectionShop({ size: 10 }).then((res) => {
        console.log('收藏店铺列表', res)
        if (res.status == 1) { this.collectionShop = res; }
        this.httpService.collectionList({ size: 10 }).then((res) => {
          console.log('收藏店商品列表', res)
          if (res.status == 1) { this.collectionList = res; }
          if (finished) { finished(); }
        })
      })
    })
  }
  /*下拉刷新*/
  doRefresh(refresher) {
    if (this.classSelect == 'care') {
      this.httpService.collectionShop({ size: 10 }).then((res) => {
        console.log('收藏店铺列表', res)
        if (res.status == 1) { this.collectionShop = res; }
        this.httpService.collectionList({ size: 10 }).then((res) => {
          console.log('收藏店商品列表', res)
          if (res.status == 1) { this.collectionList = res; }
          setTimeout(() => {
            refresher.complete();
          }, 500);
        })
      })
    }
  }
  //转跳品牌列表页
  goToMoreBrand() {
    this.navCtrl.push(MoreBrandPage)
  }
  //分类页后退按钮
  pop() {
    if (this.myNav.canGoBack()) {
      this.myNav.pop();
    }
  }
  /*when care page*/
  checkBoxToggle() {
    this.showCheckBox = !this.showCheckBox;
    this.content.resize();//更新content容器
    console.log('content更新~')
  }
  unfollowShop(suppliers_id, index) {
    this.native.openAlertBox('确认取消关注改商铺', () => {
      this.httpService.delCollectionShop({ shop_ids: [suppliers_id] }).then((res) => {
        console.log(res);
        if (res.status == 1) {
          this.native.showToast('已取消关注~')
          this.collectionShop.data.splice(index, 1);
        }
      })
    })
  }
  unfollowGoods(goods_id, index) {
    this.native.openAlertBox('确认取消关注改商铺', () => {
      this.httpService.delCollectionGoods({ rec_ids: [goods_id] }).then((res) => {
        console.log(res);
        if (res.status == 1) {
          this.native.showToast('已取消关注~')
          this.collectionList.data.splice(index, 1);
        }
      })
    })
  }
  joinCar(goods_id) {
    this.navCtrl.push(ParticularsPage, { goodsId: goods_id });
  }
}
