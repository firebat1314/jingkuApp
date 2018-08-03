import { Component, ViewChild } from '@angular/core';
import { NavController, Events, Slides, Content, FabButton, PopoverController, IonicPage, AlertController, ModalController } from 'ionic-angular';
// import { FormBuilder } from '@angular/forms';

import { UserData } from "../../providers/user-data";
import { HttpService } from "../../providers/http-service";
import { Native } from "../../providers/native";
import { XimuProvider } from '../../providers/ximu/ximu';
import { MineProvider } from '../../providers/mine/mine';
import { JpushService } from '../../providers/jpush-service';
import { Subscription } from 'rxjs/Subscription';

@IonicPage({
   segment: 'home',
   name: 'HomePage'
})
@Component({
   selector: 'page-home',
   templateUrl: 'home.html'
})
export class HomePage {
   showPrice: boolean;
   userInfo: any;
   currentUser: Subscription;

   data: any;
   fastbuyData: any;
   indexHotGoods: any;
   jingxuan_img4: any;
   hotBrand_img: string;
   jingxuan_img3: string;
   jingxuan_img2: string;
   jingxuan_img1: string;

   baitiao: any;//白条开通状态

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
   schemeUrl: string;

   constructor(
      public navCtrl: NavController,
      private userData: UserData,
      private events: Events,
      private httpService: HttpService,
      // private formBuilder: FormBuilder,
      private native: Native,
      public popoverCtrl: PopoverController,
      public alertCtrl: AlertController,
      private ximu: XimuProvider,
      private mine: MineProvider,
      private jpushServ: JpushService,
   ) {
      //地址更新
      this.events.subscribe('home:update', () => {
         this.getHomeData()
      });
      (window as any).handleOpenURL = (url: string) => {
         console.log(url)
         this.schemeUrl = url;
      };
   }
   ngAfterViewInit() {

   }
   ionViewDidLoad() {
      console.log('ionViewDidLoad HomePage');
   }
   ngOnInit() {
      this.httpService.getStorage('fastbuyData').then((res) => {
         if (res) this.fastbuyData = res;
      })
      this.httpService.getStorage('homeData').then((res) => {
         if (res) {
            this.data = res;
            this.assignData(res);
         }
      })
      this.currentUser = this.mine.currentUser.subscribe(data => {
         this.userInfo = data;
         this.jpushServ.setAlias(data.data.user_info.user_name).then(res => {
            console.log('setAlias', data.data.user_info.user_name)
         });
         this.jpushServ.addTags([data.data.user_info.mobile_phone])
      })
      this.mine.getUser();
      this.getHomeData().then(() => {
         console.log('首页加载完成');
      }).catch((res) => {
         this.native.showToast('首页加载失败');
      })
   }
   ngOnDestroy() {
      this.events.unsubscribe('home:update');
      this.currentUser.unsubscribe();
   }
   getHomeData() {
      this.httpService.presell({ type: 'is_promote', cat_id: 0 }, { showLoading: false, showToast: false }).then((res) => {
         if (res.status == 1) {
            this.fastbuyData = res;
            this.httpService.setStorage('fastbuyData', res);
         }
      });
      this.httpService.loan_status().then((res) => {
         this.baitiao = res;
         this.httpService.setByName('userBaitiao', res);
      })
      this.httpService.recommendGoods({ id: 3 }).then((res) => {
         if (res.status == 1) {
            this.getCategoryRecommendGoodsHot = res.list;
         }
      })
      this.httpService.recommendGoods({ id: 4 }).then((res) => {
         if (res.status == 1) {
            this.getCategoryRecommendGoods = res.list;
         }
      })
      this.httpService.recommendGoods({ id: 5 }).then((res) => {
         if (res.status == 1) {
            this.getCategoryRecommendGoodsBest = res.list;
         }
      })
      this.httpService.recommendGoods({ id: 6 }).then((res) => {
         if (res.status == 1) {
            this.indexHotGoods = res.list;//热门商品
         }
      })
      return this.httpService.indexs().then((res) => {
         if (res.status == 1) {
            this.data = res;
            this.assignData(res);
            this.httpService.setStorage('homeData', res);
         }
      })
   }
   goSearchPage() {
      // this.modalCtrl.create('SearchPage', '', { enterAnimation: '' }).present();
      this.navCtrl.push('SearchPage', {}, { animate: false, animation: 'md-transition' })
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
      //精选专题 大图2
      this.jingxuan_img2 = res.data.ads_jxzttwo[0];
      //精选专题 大图3
      this.jingxuan_img3 = res.data.ads_jxztThree[0];
      //好店推荐
      this.jingxuan_img4 = res.data.ads_hdtj;
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
   goMessagePage() {
      this.navCtrl.push('MessagePage')
   }
   openScanner(e) {
      e.stopPropagation();
      this.native.openBarcodeScanner().then((result) => {
         this.httpService.SpecialMachiningGoodsInfo({ id: result['text'] }).then(res => {
            if (res.status == 1) {
               if (res.is_true) {
                  this.native.openAlertBox(
                     '已存在加工单，是否前往加工',
                     () => {
                        this.navCtrl.push('AddProcessPage', { is_scanner: 1 });
                     },
                     () => {
                        let modal = this.modalCtrl.create('ParticularsModalAttrPage', {
                           headData: res.info,
                           scannerId: result['text'],
                           cutId: result['text']//这里为任意值
                        }, { cssClass: 'my-modal-style' });
                        modal.onDidDismiss(data => {
                           if (!data) return;
                           data(this.navCtrl);
                        });
                        modal.present();
                     })
               } else {
                  let modal = this.modalCtrl.create('ParticularsModalAttrPage', {
                     headData: res.info,
                     scannerId: result['text'],
                     cutId: result['text']//这里为任意值
                  }, { cssClass: 'my-modal-style' });
                  modal.onDidDismiss(data => {
                     if (!data) return;
                     data(this.navCtrl);
                  });
                  modal.present();
               }
            } else {
               this.native.showToast(res.info);
            }
         })
      }).catch((e) => {
         
      })
   }
   goBrandPage() {
      this.navCtrl.push('BrandPage')
   }
   goClassPage() {
      this.navCtrl.parent.select(1);
   }
   goCityPage() {
      this.navCtrl.push('CityPage', { areaList: this.areaList })
   }
   goParticularsPage(id, isActivity) {
      this.navCtrl.push('ParticularsPage', { goodsId: id, isActivity: isActivity == 1 ? 1 : 0 })
   }
   goBrandListPage(id) {
      this.navCtrl.push('BrandListPage', { brandId: id })
   }
   goWhitebarPage() {
      // if (this.native.isAndroid()) {
      if (this.baitiao.status) {
         this.ximu.openXimu(this.baitiao.data.url);
      } else {
         this.navCtrl.push('BtAuthorizationPage');
      }
      // } else {
      // this.native.showToast('该功能现仅在安卓客户端开放');
      // }
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
