import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Events, PopoverController, IonicPage, AlertController, ModalController, App, InfiniteScroll, Content } from 'ionic-angular';
import { HttpService } from "../../providers/http-service";
import { Native } from "../../providers/native";
import { XimuProvider } from '../../providers/ximu/ximu';
import { MineProvider } from '../../providers/mine/mine';
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

   data: any;//indexs
   fastbuyData: any;//闪购商品

   baitiao: any;//白条开通状态

   area: string = '请选择';
   areaList: any;//城市列表


   bannerImgs;//轮播图
   categoryAddetatils;//右下广告
   hotBrand_img: string;//右下广告
   getBrands;//左边广告
   brand_street: any;//广告街区
   categoryData: any;//分类
   categoryAds: any;

   category = [
      { id: 16, ad_id: 99, show: false, data: null, ads: null },
      { id: 17, ad_id: 100, show: false, data: null, ads: null },
      { id: 18, ad_id: 101, show: false, data: null, ads: null },
      { id: 19, ad_id: 102, show: false, data: null, ads: null },
      { id: 20, ad_id: 103, show: false, data: null, ads: null },
      { id: 21, ad_id: 104, show: false, data: null, ads: null },
      { id: 22, ad_id: 105, show: false, data: null, ads: null },
      { id: 23, ad_id: 106, show: false, data: null, ads: null },
      { id: 24, ad_id: 107, show: false, data: null, ads: null },
   ];
   categoryI = 0;
   @ViewChild(Content) content: Content;

   constructor(
      public navCtrl: NavController,
      private events: Events,
      private httpService: HttpService,
      private native: Native,
      public popoverCtrl: PopoverController,
      public alertCtrl: AlertController,
      private ximu: XimuProvider,
      private mine: MineProvider,
      private modalCtrl: ModalController,
      private app: App,
      private ele: ElementRef
   ) {
      //地址更新
      this.events.subscribe('home:update', () => {
         this.getHomeData()
      })
   }
   ngAfterViewInit() {
      var subsection = this.ele.nativeElement.querySelectorAll('.subsection');
      this.content.ionScroll.subscribe((d) => {
         subsection.forEach((div, index) => {
            if (!div.myset) {
               if (d.scrollTop + d.contentHeight > div.offsetTop - 50) {
                  div.myset = true;
                  this.httpService.recommendGoods({ id: this.category[index].id }).then((res) => {
                     if (res.status == 1) {
                        this.category[index].data = res;
                        this.category[index].show = true;
                     }
                  })
                  this.httpService.getCategoryAd({ id: this.category[index].ad_id }).then((res) => {
                     if (res.status == 1) {
                        this.category[index].ads = res;
                        this.category[index].show = true;
                     }
                  })
               }
            }
         });
      });
   }
   ionViewDidEnter() {
      this.app.setTitle('首页');
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
      this.httpService.getHomebanner({ int_pos_id: 49, app: 1 }).then((res) => {
         if (res.status == 1) { this.brand_street = res; }
      })
      this.httpService.loan_status().then((res) => {
         this.baitiao = res;
         this.httpService.setByName('userBaitiao', res);
      })

      this.httpService.IndexData()
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
   getRecommendGoods(item, brand_id?, dom?) {
      this.httpService.recommendGoods({ id: item.id, brand_id: brand_id || null }).then((res) => {
         if (res.status == 1) {
            this.content.scrollTo(0, dom.offsetTop);
            item.data = res;
         }
      })
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
   tuangou() {
      this.native.showToast('功能还在开发中^_^');
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
