import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, Searchbar, Nav } from 'ionic-angular';

import { SubnavPage1Page } from './subnav-page1/subnav-page1'
import { HttpService } from "../../providers/http-service";
import { MoreBrandPage } from "./more-brand/more-brand";
import { ParticularsPage } from "../home/particulars/particulars";
import { Native } from "../../providers/native";
import { BrandListPage } from "../home/brand-list/brand-list";
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
  brandList: any;
  collectionList: any;//收藏商品列表
  collectionShop: any;//收藏店铺列表
  getCategorys: any;//获取分类信息
  classSelect: any = 'classify';//brand or classify or care
  careSelect: any = 'shop';//shop or goods
  root = SubnavPage1Page;
  showBackBtn: boolean = false;//显示分类栏返回按钮
  showCheckBox: boolean = false;//显示取消关注复选框

  selectedShopArr: Array<any>;
  selectedGoodsArr: Array<any>;


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
      this.httpService.brandList().then((res) => {
        console.log(res)
        if (res.status == 1) { this.brandList = res }
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
    })
  }
  /*下拉刷新*/
  doRefresh(refresher?) {
    if (this.classSelect == 'care') {
      this.httpService.collectionShop({ size: 10 }).then((res) => {
        console.log('收藏店铺列表', res)
        if (res.status == 1) { this.collectionShop = res; }
        this.httpService.collectionList({ size: 10 }).then((res) => {
          console.log('收藏店商品列表', res)
          if (res.status == 1) { this.collectionList = res; }
          setTimeout(() => {
            if (refresher) { refresher.complete(); }
          }, 500);
        })
      })
    } else if (this.classSelect == 'classify') {
      setTimeout(() => {
        refresher.complete();
      }, 500);
    } else if (this.classSelect == 'brand') {
      setTimeout(() => {
        refresher.complete();
      }, 500);
    }
  }
  //转跳品牌列表页
  goToMoreBrand(data) {
    this.navCtrl.push(MoreBrandPage, { data: data })
  }
  toBrandList(id) {
    this.navCtrl.push(BrandListPage, { listId: id })
  }
  clickBanner(item) {
    if (item.link_type.type_name == 'category') {
      this.navCtrl.parent.select(1);
      /*this.navCtrl.push(ClassifyPage, {
        categoryId: item.link_type.type_value
      })*/
    } else if (item.link_type.type_name == 'goods') {
      this.navCtrl.push(ParticularsPage, {
        goodsId: item.link_type.type_value
      })
    } else if (item.link_type.type_name == "brand") {
      this.navCtrl.parent.select(1);
      /*this.navCtrl.push(ClassifyPage, {
        brandId: item.link_type.type_value
      })*/
    }
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
          this.doRefresh();
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
          this.doRefresh();
        }
      })
    })
  }
  joinCar(goods_id) {
    this.navCtrl.push(ParticularsPage, { goodsId: goods_id });
  }
  //批量取消关注按钮
  confirmForCollection() {
    this.selectedShopArr = [];
    this.selectedGoodsArr = [];
    if (this.careSelect == 'shop') {
      this.native.openAlertBox('是否取消关注选中店铺？', () => {
        console.log(this.selectedShopArr)
        this.httpService.delCollectionShop({ shop_ids: this.selectedShopArr }).then((res) => {
          console.log(res);
          if (res.status == 1) {
            this.native.showToast('已取消关注~');
            this.doRefresh();
          }
        })
      })
      for (let i = 0; i < this.collectionShop.data.length; i++) {
        if (this.collectionShop.data[i].selected) {
          this.selectedShopArr.push(this.collectionShop.data[i].csid)
        }
      }
    }
    if (this.careSelect == 'goods') {
      this.native.openAlertBox('是否取消关注选中商品？', () => {
        console.log(this.selectedGoodsArr)
        this.httpService.delCollectionGoods({ rec_ids: this.selectedGoodsArr }).then((res) => {
          console.log(res);
          if (res.status == 1) {
            this.native.showToast('已取消关注~');
            this.doRefresh();
          }
        })
      })
      for (let i = 0; i < this.collectionList.data.length; i++) {
        if (this.collectionList.data[i].selected) {
          this.selectedGoodsArr.push(this.collectionList.data[i].rec_id)
        }
      }
    }

  }
}
