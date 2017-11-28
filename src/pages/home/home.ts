import { Component, ViewChild } from '@angular/core';
import { NavController, Events, Slides, Content, FabButton, PopoverController, IonicPage, AlertController } from 'ionic-angular';
// import { FormBuilder } from '@angular/forms';

import { UserData } from "../../providers/user-data";
import { HttpService } from "../../providers/http-service";
import { Native } from "../../providers/native";
import { Storage } from '@ionic/storage';

@IonicPage({
  segment: 'home',
  name: 'HomePage'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data: any;
  fastbuyData: any;
  indexHotGoods: any;
  jingxuan_img4: any;
  hotBrand_img: string;
  jingxuan_img3: string;
  jingxuan_img2: string;
  jingxuan_img1: string;

  area: string = '请选择';
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

  constructor(
    public navCtrl: NavController,
    private userData: UserData,
    private events: Events,
    private httpService: HttpService,
    // private formBuilder: FormBuilder,
    private native: Native,
    private storage: Storage,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController
  ) {
    //地址更新
    this.events.subscribe('home:update', () => {
      this.getHomeData()
    })
    /* this.storage.get('sss').then((res) => {
      alert(res)
    }) */
  }
  ngAfterViewInit() {
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  ngOnDestroy() {
    this.events.unsubscribe('home:update');
  }
  /*getBanner() {
      this.httpService.getHomebanner({ int_pos_id: 53, size: 10,is_app:1 }).then((res) => {
        if (res.status == 1) { this.bannerImgs = res.data; }
      })
    } */
  ngOnInit() {
    this.storage.get('fastbuyData').then((res) => {
      if (res) {
        this.fastbuyData = res;
      }
    })
    this.storage.get('homeData').then((res) => {
      if (res) {
        this.data = res;
        this.assignData(res);
      }
      this.getHomeData().then(() => {
        console.log('首页加载完成');
      }).catch((res) => {
        this.native.showToast('首页加载失败');
      })
    })
  }
  getHomeData() {
    this.httpService.presell({ type: 'is_promote', cat_id: 0 }).then((res) => {
      if (res.status == 1) {
        this.fastbuyData = res;
        this.storage.set('fastbuyData', res);
      }
    });
    return this.httpService.indexs().then((res) => {
      if (res.status == 1) {
        this.data = res;
        this.assignData(res);
        this.storage.set('homeData', res);
      }
    })
  }
  assignData(res) {
    //城市列表
    this.areaList = res.data.getAreaList;
    //默认城市
    for (let i = 0; i < this.areaList.length; i++) {
      if (this.areaList[i].selected == 1) {
        this.area = this.areaList[i].region_name;
      }
    }
    //轮播 
    this.bannerImgs = res.data.ads_banner;
    //闪购 左
    this.hotBrand_img = res.data.ads_sgz[0];
    //闪购 右
    this.categoryAddetatils = res.data.ads_sgy[0];
    //闪购 下
    this.getBrands = res.data.ads_sgx[0];
    //精选专题 大图1
    this.jingxuan_img1 = res.data.ads_jxzt[0];
    this.getCategoryRecommendGoodsHot = res.data.hot_recommend_goods;
    //精选专题 大图2
    this.jingxuan_img2 = res.data.ads_jxzttwo[0];
    this.getCategoryRecommendGoods = res.data.new_recommend_goods;
    //精选专题 大图3
    this.jingxuan_img3 = res.data.ads_jxztThree[0];
    this.getCategoryRecommendGoodsBest = res.data.best_recommend_goods;
    //好店推荐
    this.jingxuan_img4 = res.data.ads_hdtj;
    //热门商品
    this.indexHotGoods = res.data.index_hot_goods;
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
    this.getHomeData().then(() => {
      setTimeout(() => {
        refresher.complete();
      }, 500);
    }).catch(() => {
      setTimeout(() => {
        refresher.complete();
      }, 500);
    })
  }
  /* updataArea() {
    this.httpService.getAreaList().then((res) => {
      if (res && res.status == 1) {
        this.areaList = res.data;
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].selected == 1) {
            this.area = res.data[i].region_name;
          }
        }
      }else if(res.status==0){
        
      }
    })
  } */
  goMessagePage() {
    this.navCtrl.push('MessagePage')
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create('PopoverHomePage', {}, { cssClass: '' });
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
      if (data) {
        this.navCtrl.push(data);
      }
    })
  }
  goBrandPage() {
    this.navCtrl.push('BrandPage')
    /*this.navCtrl.popToRoot();
    this.navCtrl.parent.select(1);
    setTimeout(() => {
      this.events.publish('classify:selectSegment', value)
    }, 300); */
  }
  goClassPage() {
    this.navCtrl.parent.select(1);
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
    this.navCtrl.push('NewGlassesDesignPage');
  }
}
