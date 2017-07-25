import { Component, ViewChild } from '@angular/core';
import { NavController, Events, Slides, Content, FabButton, PopoverController, IonicPage } from 'ionic-angular';
// import { FormBuilder } from '@angular/forms';

import { UserData } from "../../providers/user-data";
import { HttpService } from "../../providers/http-service";
import { Native } from "../../providers/native";

@IonicPage()
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

  bannerImgs;
  categoryAddetatils;
  mySlideOptions;
  getCategoryRecommendGoods;
  getCategoryRecommendGoodsBest;
  getCategoryRecommendGoodsHot;
  getBrands;

  firstInit = true;
  constructor(
    public navCtrl: NavController,
    private userData: UserData,
    private events: Events,
    private httpService: HttpService,
    // private formBuilder: FormBuilder,
    private native: Native,
    // private storage: Storage,
    public popoverCtrl: PopoverController
  ) {
    //地址更新
    this.events.subscribe('home:updataArea', () => { this.updataArea() })
  }
  ngAfterViewInit() {
    this.content.ionScroll.subscribe((d) => {
      this.fabButton.setElementClass("fab-button-out", d.directionY == "down");
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.getBanner();
    this.updataArea();
    this.updateCarCount();
  }
  ngOnDestroy() {
    this.events.unsubscribe('home:updataArea');
  }
  getBanner() {
    this.httpService.getHomebanner({ int_pos_id: 53 }).then((res) => {
      if (res.status == 1) { this.bannerImgs = res.data; }
    })
  }
  /* ionViewWillEnter(){
    console.log(111)
  } */
  ngOnInit(){
    this.getHomeData().then((res)=>{
      console.log('首页加载完成')
    })
  }
  /* ionViewCanEnter() {
    if (!this.firstInit) {
      return true;
    }
    return this.getHomeData().then(() => {
      return true;
    }, (info) => {
      this.native.showToast(info, null, false);
      return true;
    }).catch((res) => {
      this.native.showToast('数据异常');
      return true;
    })
  } */
  getHomeData(finish?) {
    this.firstInit = false;
    this.native.showLoading();
    return new Promise((resolve, reject) => {
      this.updataArea();
      this.httpService.indexs().then((res) => {
          this.native.hideLoading();
        if (res.status == 1) {
          resolve();
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
          if (finish) { finish(); }
        } else {
          reject(res.info);
        }
      }).catch((res) => {
        console.log(res);
        reject(res.info);
      })
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
      }
    })
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create('PopoverHomePage', {}, {});
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
      if (data) {
        this.navCtrl.push(data);
      }
    })
  }
  goClassPage(value) {
    this.navCtrl.popToRoot();
    this.navCtrl.parent.select(1);
    this.events.publish('classify:selectSegment', value)
  }
  goCityPage() {
    this.navCtrl.push('CityPage', { areaList: this.areaList })
  }
  goParticularsPage(id) {
    this.navCtrl.push('ParticularsPage', { goodsId: id })
  }
  goBrandListPage(id) {
    this.navCtrl.push('BrandListPage', { brandId: id })
  }
  goWhitebarPage() {
    this.native.showToast('敬请期待')
  }
  goPresellPage() {
    this.navCtrl.push('PresellPage');
  }
  goRechargePage() {
    this.navCtrl.push('RechargePage');
  }
  goFastbuyPage() {
    this.navCtrl.push('FastbuyPage');
  }
  goDiscountCouponPage() {
    this.navCtrl.push('DiscountCouponPage');
  }
  goIntegralstorePage() {
    this.navCtrl.push('IntegralstorePage');
  }
  goGlassesDesignPage() {
    this.navCtrl.push('GlassesDesignPage');
  }
}
