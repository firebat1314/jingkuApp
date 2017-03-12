import { Component, ViewChild } from '@angular/core';

import { NavController, Events, Slides, Content } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';


import { DirectiveTestPage } from '../directive-test/directive-test'
import { CityPage } from './city/city'
import { SearchPage } from './search/search'
import { DetailsPage } from './details/details'
import { BrandListPage } from './brand-list/brand-list'
import { AttentionPage } from './attention/attention'
import { FastbuyPage } from './fastbuy/fastbuy'
import { GlassesDesignPage } from './glasses-design/glasses-design'
import { IntegralstorePage } from './integralstore/integralstore'
import { RechargePage } from './recharge/recharge'
import { WhitebarPage } from './whitebar/whitebar'
import { DiscountCouponPage } from './discount-coupon/discount-coupon'
import { MessagePage } from './message/message'
import { ParticularsPage } from './particulars/particulars'
import { ClassifyPage } from '../classify/classify'


import { UserData } from "../../services/user-data";
import { HttpService } from "../../providers/http-service";

import { ImgTabs } from "../../conponents/img-tabs/img-tabs";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('bannerSlide') slides: Slides;
  @ViewChild(Content) content: Content;
  myHomeSearch: String = '';
  showBackTopBtn: Boolean = true;

  DirectiveTestPage = DirectiveTestPage;
  cityPage = CityPage;
  DetailsPage = DetailsPage;
  SearchPage = SearchPage;
  BrandListPage = BrandListPage;
  AttentionPage = AttentionPage;
  FastbuyPage = FastbuyPage;
  GlassesDesignPage = GlassesDesignPage;
  IntegralstorePage = IntegralstorePage;
  RechargePage = RechargePage;
  WhitebarPage = WhitebarPage;
  DiscountCouponPage = DiscountCouponPage;
  MessagePage = MessagePage;

  bannerImgs;
  categoryAddetatils;
  handpickDetails;
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
    private formBuilder: FormBuilder
  ) {

  }
  ngOnInit() {
    this.httpService.getHomebanner({
      int_pos_id: 36
    }).then((res) => {
      console.log("轮播图", res);
      //this.slides.update();//刷新轮播图
      this.bannerImgs = res.data;//获取轮播图
    })
    this.httpService.getCategoryAd().then((res) => {
      console.log("热门品类", res)
      this.categoryAddetatils = res.data;
    })
    this.httpService.getBrands().then(((res) => {
      console.log("热门品牌下的品牌列表", res)
      this.getBrands = res.data;
    }))
    this.httpService.getHandpickDetails().then((res) => {
      console.log("精选专题下热门商品", res)
      this.handpickDetails = res.data;
    })
    this.httpService.getCategoryRecommendGoodsHot().then(((res) => {
      console.log("精选专题下的商品列表", res)
      this.getCategoryRecommendGoodsHot = res.data;
    }))
    this.httpService.getCategoryRecommendGoods().then((res) => {
      console.log("新品", res)
      this.getCategoryRecommendGoods = res.data;
    })
    this.httpService.getCategoryRecommendGoodsBest().then(((res) => {
      console.log("精品商品", res)
      this.getCategoryRecommendGoodsBest = res.data;
    }))
  }
  ngAfterViewInit() {

  }
  onSlideClick(event) {
    console.log(event)
  }

  clickBanner(item) {
    if (item.link_type.type_name == 'category') {
      this.navCtrl.push(ClassifyPage, {
        categoryId: item.link_type.type_value
      })
    } else if (item.link_type.type_name == 'goods') {
      this.navCtrl.push(ParticularsPage, {
        goodsId: item.link_type.type_value
      })
    } else if (item.link_type.type_name == "brand") {
      this.navCtrl.push(ClassifyPage, {
        brandId: item.link_type.type_value
      })
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  onCancel(event) {

  }

  onInput(event) {

  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  scrollHeight() {
    // if (this.content.scrollTop > 400) {
    //   this.showBackTopBtn = true;
    // } else if (this.content.scrollTop <= 400) {
    //   this.showBackTopBtn = false;
    // }
    // console.log(this.showBackTopBtn, this.content.scrollTop)
  }
}
