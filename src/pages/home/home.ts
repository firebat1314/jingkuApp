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

  myHomeSearch: String = '';
  bannerImgs;
  categoryAddetatils;
  handpickDetails;
  showBackTopBtn: Boolean = true;
  mySlideOptions;

  constructor(
    public navCtrl: NavController,
    private userData: UserData,
    private events: Events,
    private httpService: HttpService,
    private formBuilder: FormBuilder
  ) {

    this.getBannerImg();
    this.getCategoryAd();
    this.getHandpickDetails();

  }
  ngOnInit() {
  }
  ngAfterViewInit() {

  }
  getBannerImg() {

    let self = this;
    this.httpService.getHomebanner().then(res => {
      console.log(res);
      this.bannerImgs = res.data;//获取轮播图
      //this.slides.update();//刷新轮播图

    })
  }
  getCategoryAd() {
    this.httpService.getCategoryAd().then(res => {
      console.log(res)
      this.categoryAddetatils = res.data;
    })
  }
  getHandpickDetails() {
    this.httpService.getHandpickDetails().then(res => {
      console.log(res)
      this.handpickDetails = res.data;
    })
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
