import { Component, ViewChild } from '@angular/core';

import { NavController, Events, Slides, Content, FabButton } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';


import { CityPage } from './city/city'
import { SearchPage } from './search/search'
import { DetailsPage } from './details/details'
import { BrandListPage } from './brand-list/brand-list'
import { FastbuyPage } from './fastbuy/fastbuy'
import { GlassesDesignPage } from './glasses-design/glasses-design'
import { IntegralstorePage } from './integralstore/integralstore'
import { RechargePage } from './recharge/recharge'
import { WhitebarPage } from './whitebar/whitebar'
import { DiscountCouponPage } from './discount-coupon/discount-coupon'
import { MessagePage } from './message/message'
import { ParticularsPage } from './particulars/particulars'
import { PresellPage } from "../my/presell/presell";


import { UserData } from "../../providers/user-data";
import { HttpService } from "../../providers/http-service";

import { Native } from "../../providers/native";
import { ClickBanner } from "../../providers/ClickBanner";

import { Storage } from '@ionic/storage';

/*@IonicPage({
  name: 'home'
})*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  jingxuan_img4: any;
  hotBrand_img: string;
  jingxuan_img3: string;
  jingxuan_img2: string;
  jingxuan_img1: string;

  area: string = '北京';
  areaList: any;

  @ViewChild('bannerSlide') slides: Slides;
  @ViewChild(Content) content: Content;
  @ViewChild(FabButton) fabButton: FabButton;
  showBackTopBtn: Boolean = true;
  adClick: ClickBanner = new ClickBanner(this.navCtrl, this.events);

  DetailsPage = DetailsPage;
  SearchPage = SearchPage;
  BrandListPage = BrandListPage;
  FastbuyPage = FastbuyPage;
  GlassesDesignPage = GlassesDesignPage;
  IntegralstorePage = IntegralstorePage;
  RechargePage = RechargePage;
  WhitebarPage = WhitebarPage;
  DiscountCouponPage = DiscountCouponPage;
  MessagePage = MessagePage;
  PresellPage = PresellPage;

  bannerImgs;
  categoryAddetatils;
  mySlideOptions;
  getCategoryRecommendGoods;
  getCategoryRecommendGoodsBest;
  getCategoryRecommendGoodsHot;
  getBrands;

  constructor(
    public navCtrl: NavController,
    private userData: UserData,
    private events: Events,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private native: Native,
    private storage: Storage,
  ) { }
  ngAfterViewInit() {
    this.content.ionScroll.subscribe((d) => {
      this.fabButton.setElementClass("fab-button-out", d.directionY == "up");
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.getBanner();
    this.getHomeData();
    this.updataArea();
    this.updateCarCount();
    /**
     * 地址更新事件
     */
    this.events.subscribe('home:updataArea', () => {
      this.updataArea();
    })
  }
  ngOnDestroy() {
    this.events.unsubscribe('home:updataArea');
  }
  getBanner() {
    this.httpService.getHomebanner({ int_pos_id: 53 }).then((res) => {
      if (res.status == 1) { this.bannerImgs = res.data; }
    })
  }
  getHomeData(finish?) {
    // this.native.showLoading('加载中');
    this.updataArea();
    this.httpService.indexs().then((res) => {
      if (res.status == 1) {
        this.hotBrand_img = res.data.ads_rmpp['0'];
        this.categoryAddetatils = res.data.ads_emdp;
        this.jingxuan_img1 = res.data.ads_jxzt['0'];
        this.getBrands = res.data.get_brands;
        this.jingxuan_img2 = res.data.ads_jxzttwo['0'];
        this.getCategoryRecommendGoodsHot = res.data.hot_recommend_goods;
        this.jingxuan_img3 = res.data.ads_jxztThree['0'];
        this.getCategoryRecommendGoods = res.data.new_recommend_goods;
        this.jingxuan_img4 = res.data.ads_hdtj;
        this.getCategoryRecommendGoodsBest = res.data.best_recommend_goods;
        // this.native.hideLoading();
        if (finish) { finish(); }
      }
    })
    /*this.httpService.getHomebanner({ int_pos_id: 44, size: 1 }).then((res) => {
      if (res.status == 1) { this.hotBrand_img = res; }
      this.httpService.getCategoryAd({ int_pos_id: 27, int_size: 10 }).then((res) => {
        if (res.status == 1) { this.categoryAddetatils = res.data; }
        this.httpService.getHomebanner({ int_pos_id: 45, size: 1 }).then((res) => {
          if (res.status == 1) { this.jingxuan_img1 = res.data[0]; }
          this.native.hideLoading();
          if (finish) { finish(); }
          this.httpService.getBrands().then(((res) => {
            if (res.status == 1) { this.getBrands = res.data; }
            this.httpService.getHomebanner({ int_pos_id: 46, size: 1 }).then((res) => {
              if (res.status == 1) { this.jingxuan_img2 = res.data[0]; }
              this.httpService.getCategoryRecommendGoodsHot().then(((res) => {
                if (res.status == 1) { this.getCategoryRecommendGoodsHot = res.data; }
                this.httpService.getHomebanner({ int_pos_id: 47, size: 1 }).then((res) => {
                  if (res.status == 1) { this.jingxuan_img3 = res.data[0]; }
                  this.httpService.getCategoryRecommendGoods().then((res) => {
                    if (res.status == 1) { this.getCategoryRecommendGoods = res.data; }
                    this.httpService.getHomebanner({ int_pos_id: 48 }).then((res) => {
                      if (res.status == 1) { this.jingxuan_img4 = res.data; }
                      this.httpService.getCategoryRecommendGoodsBest().then(((res) => {
                        if (res.status == 1) { this.getCategoryRecommendGoodsBest = res.data; }
                      }))
                    })
                  })
                })
              }))
            })
          }))
        })
      })
    })*/
  }
  onscroll() {
    // if (this.content.scrollTop > 400) {
    //   this.showBackTopBtn = true;
    // } else if (this.content.scrollTop <= 400) {
    //   this.showBackTopBtn = false;
    // }
  }
  /*下拉刷新*/
  doRefresh(refresher) {
    this.getHomeData(() => {
      setTimeout(() => {
        refresher.complete();
      }, 500);
    })
  }
  updataArea() {
    this.httpService.getAreaList().then((res) => {
      if (res && res.status == 1) {
        this.areaList = res.data;
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].selected == 1) {
            this.area = res.data[i].region_name;
          }
        }
      }
    })
  }
  updateCarCount() {
    this.httpService.getFlowGoods().then((res) => {
      if (res.status == 1) {
        this.events.publish('car:goodsCount', res.total.real_goods_count);
        this.storage.set('real_goods_count', res.total.real_goods_count)
      }
    })
  }
  goClassPage(value) {
    this.navCtrl.popToRoot();
    this.navCtrl.parent.select(1);
    this.events.publish('classify:selectSegment', value);
  }
  scrollToTop() {
    this.content.scrollToTop();
  }
  goCityPage() {
    this.navCtrl.push(CityPage, { areaList: this.areaList })
  }
  goParticularsPage(id) {
    this.navCtrl.push(ParticularsPage, { goodsId: id })
  }
  goBrandListPage(id) {
    this.navCtrl.push(BrandListPage, { brandId: id })
  }
  goWhitebarPage() {
    this.native.showToast('敬请期待')
  }
  goPresellPage() {
    this.navCtrl.push(PresellPage);
  }
  goRechargePage() {
    this.navCtrl.push(RechargePage);
  }
  goFastbuyPage() {
    this.navCtrl.push(FastbuyPage);
  }
  goDiscountCouponPage() {
    this.navCtrl.push(DiscountCouponPage);
  }
  goIntegralstorePage() {
    this.navCtrl.push(IntegralstorePage);
  }
  goGlassesDesignPage() {
    this.navCtrl.push(GlassesDesignPage);
  }
}
