import { Component, ViewChild, ElementRef, Renderer, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, Events, Content, IonicPage, FabButton, InfiniteScroll, MenuController, ModalController } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";
/*
  Generated class for the BrandList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage({
   segment: 'brand-list/:listId/:keyword/:brandId/:supplierId/:type/:cut/:isDistribution'
})
@Component({
   selector: 'page-brand-list',
   templateUrl: 'brand-list.html',
})
export class BrandListPage {
   is_jingjia_style: any;
   goodsList: any;
   timer: any;
   infiniteScroll: InfiniteScroll;
   data: any;
   goodsCount: any;//购物车商品数量
   listStyleflag: Boolean;//列表样式切换
   listStyleLock: Boolean;//列表样式 锁定
   mytool = 'all';//当前筛选

   isCut;//切边商品列表
   isDistribution;//铺货列表

   paramsData = {
      size: 30,
      page: 1,
      brand_id: null,
      cat_id: null,
      order: null,
      stort: 'DESC',
      keywords: '',
      supplier_id: null,
      type: null,
      bonus_id: null
   }
   @ViewChild(Content) content: Content;
   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public httpService: HttpService,
      public events: Events,
      public native: Native,
      public element: ElementRef,
      public renderer: Renderer,
      public ref: ChangeDetectorRef,
      public modalCtrl: ModalController,
      public menuCtrl: MenuController
   ) { }
   ionViewDidLoad() {
      console.log('ionViewDidLoad BrandListPage');
   }
   ngOnInit() {
      this.paramsData.order=this.navParams.data.order
      this.paramsData.cat_id = this.navParams.get('listId') == ':listId' ? null : this.navParams.get('listId');
      this.paramsData.brand_id = this.navParams.get('brandId') == ':brandId' ? null : this.navParams.get('brandId') ||this.navParams.data.brand_id;
      this.paramsData.supplier_id = this.navParams.get('supplierId') == ':supplierId' ? null : this.navParams.get('supplierId');
      this.paramsData.keywords = this.navParams.get('keyword') == ':keyword' ? '' : this.navParams.get('keyword');
      this.paramsData.type = this.navParams.get('type') == ':type' ? null : this.navParams.get('type');
      this.paramsData.bonus_id = this.navParams.get('type_id') == ':type_id' ? null : this.navParams.get('type_id');
      this.isCut = this.navParams.get('cut') == ':cut' ? null : this.navParams.get('cut');
      this.isDistribution = this.navParams.get('isDistribution') == ':isDistribution' ? null : this.navParams.get('isDistribution');

      this.getListData();
      this.getCarNumver();
      this.events.subscribe('user:filterParams', (res) => {
         this.paramsData = Object.assign(this.paramsData, res);
         console.log(this.paramsData)
         this.getListData();
      });
      this.events.subscribe('car:update', () => {
         this.getCarNumver();
      });
   }
   ngAfterViewInit() {
      var pagebtn = this.element.nativeElement.querySelector('#pagebtn');
      // var cardbox = this.element.nativeElement.querySelector('single-foods-card');
      this.content.ionScroll.subscribe((d) => {
         clearTimeout(this.timer);
			/* for (let i = 0; i < this.data.page; i++) {
				const element = this.element.nativeElement.querySelectorAll('.card')[i * 30];
				console.log(element.offsetTop,d.scrollTop,d.scrollTop + d.contentHeight)
				if (element.offsetTop <= d.scrollTop + d.contentHeight) {
					this.onpage = i + 1;
				}
			} */
         this.renderer.setElementClass(pagebtn, 'fab-button-fadein', true);
      });
      this.content.ionScrollEnd.subscribe((d) => {
         this.timer = setTimeout(() => {
            this.renderer.setElementClass(pagebtn, 'fab-button-fadein', false)
         }, 500);
      });
   }
   ngOnDestroy() {
      console.log('user:filterParams')
      //退出页面取消事件订阅
      this.events.unsubscribe('user:filterParams');
   }
   getListData(showLoading = true) {
      this.getCarNumver();
      this.infiniteScroll ? this.infiniteScroll.enable(true) : null;
      if (this.isCut > 0) {//切边镜片
         return this.httpService.cutting_list(Object.assign(this.paramsData, { page: 1, size: 10 }), { showLoading: showLoading }).then((res) => {
            if (res.status == 1) {
               this.data = res;
               this.is_jingjia_style = true;
               this.goodsList = res.goods;
               this.content.resize();
               this.content.scrollToTop(0);
               this.events.publish('user:listFilter', res);
            }
         })
      } else if (this.isDistribution > 0) {
         return this.httpService.category_goods_d(Object.assign(this.paramsData, { page: 1 }), { showLoading: showLoading }).then((res) => {
            if (res.status == 1) {
               this.data = res;
               this.goodsList = res.goods;
               this.content.resize();
               this.content.scrollToTop(0);
               this.events.publish('user:listFilter', res);
            }
         })
      } else {
         return this.httpService.categoryGoods(Object.assign(this.paramsData, { page: 1 }), { showLoading: showLoading }).then((res) => {
            if (res.status == 1) {
               res.is_jingpian && !this.listStyleLock ? this.listStyleflag = true : null;
               this.data = res;
               this.is_jingjia_style = res.is_jingjia;
               this.goodsList = res.goods;
               this.content.resize();
               this.content.scrollToTop(0);
               this.events.publish('user:listFilter', res);
            }
         })
      }
   }
   doRefresh(refresher) {
      this.getListData(false).then(() => {
         setTimeout(() => {
            refresher.complete();
         }, 500);
      })
   }
   doInfinite(infiniteScroll) {
      this.infiniteScroll = infiniteScroll;
      let page = this.data.page
      if (this.data.page < this.data.pages) {
         let p = this.data.page;
         let pagingParam = Object.assign(this.paramsData, { page: ++p });
         if (this.isCut > 0) {//切边镜片
            this.httpService.cutting_list(pagingParam, { showLoading: false }).then((res) => {
               if (res.status == 1) {
                  this.data = res;
                  this.content.resize();
                  this.goodsList = [...this.goodsList, ...res.goods]
               }
               setTimeout(() => {
                  this.infiniteScroll.complete();
               }, 500);
            })
         } else if (this.isDistribution > 0) {
            return this.httpService.category_goods_d(pagingParam, { showLoading: false }).then((res) => {
               if (res.status == 1) {
                  this.data = res;
                  this.content.resize();
                  this.goodsList = [...this.goodsList, ...res.goods]
               }
               setTimeout(() => {
                  this.infiniteScroll.complete();
               }, 500);
            })
         } else {
            this.httpService.categoryGoods(pagingParam, { showLoading: false }).then((res) => {
               if (res.status == 1) {
                  this.data = res;
                  this.content.resize();
                  this.goodsList = [...this.goodsList, ...res.goods]
               }
               setTimeout(() => {
                  this.infiniteScroll.complete();
               }, 500);
            })
         }
      } else {
         this.infiniteScroll.enable(false);
      }
   }
   getCarNumver() {
      this.httpService.get_flow_goods_number().then((res) => {
         if (res.status == 1) {
            this.goodsCount = res.data;
         }
      })
   }
   searchGoods() {
      this.paramsData.cat_id = null;
      this.getListData();
   }
   ionClear() {
      this.paramsData.keywords = null;
      this.getListData();
   }
   goSearchPage() {
      let modal = this.modalCtrl.create('SearchPage', {
         key: this.paramsData.keywords,
         type: this.isCut > 0 ? '2' : (this.isDistribution > 0 ? '3' : '1'),
         callback: {
            search: (key, type) => {
               this.paramsData.keywords = key;
               switch (type) {
                  case '2': {
                     this.httpService.search_census({ type: 'cutting', search_name: key });//搜索统计接口
                     this.isCut = 1;
                     this.isDistribution = 0;
                  }; break;
                  case '3': {
                     this.httpService.search_census({ type: 'distribution', search_name: key });//搜索统计接口
                     this.isCut = 0;
                     this.isDistribution = 1;
                  }; break;
                  default: {
                     this.httpService.search_census({ type: 'goods', search_name: key });//搜索统计接口
                     this.isCut = 0;
                     this.isDistribution = 0;
                  }; break;
               }
               this.getListData();
            }
         }
      });
      modal.present();
      // this.navCtrl.push('SearchPage', {}, { animate: false, animation: 'md-transition' })
      /* modal.onDidDismiss((data)=>{

      }) */
   }
   allStatus = true;
   salesNumStatus = true;
   shopPriceStatus = true;
   mytoolChange() {//——_——|||.....
      this.infiniteScroll ? this.infiniteScroll.enable(true) : null;
      if (this.mytool == 'all') {

         this.paramsData.order = '';
         this.salesNumStatus = true;
         this.shopPriceStatus = true;
         this.paramsData.stort = 'DESC';
			/* if (this.allStatus) {
			this.paramsData.stort = 'ASC';
			this.allStatus = false;
			this.getListData();
		} else {
			this.allStatus = true;
			this.paramsData.stort = 'DESC';
			this.getListData();
		} */
         this.getListData();
      }
      if (this.mytool == 'goods_sort') {
         this.paramsData.order = 'goods_sort';
         this.paramsData.stort = 'DESC';
         this.getListData();
      }
      if(this.mytool == 'new'){
         this.paramsData.order = 'new';
         this.paramsData.stort = 'DESC';
         this.getListData();
      }
      if (this.mytool == 'sales_num') {

         this.paramsData.order = 'sales_num';
         this.allStatus = true;
         this.shopPriceStatus = true;
         this.paramsData.stort = 'DESC';
			/* if (!this.salesNumStatus) {
				this.paramsData.stort = 'ASC';
				this.salesNumStatus = true;
				this.getListData();
			} else {
				this.salesNumStatus = false;
				this.paramsData.stort = 'DESC';
				this.getListData();
			} */
         this.getListData();
      }
      if (this.mytool == 'shop_price') {
         this.paramsData.order = 'shop_price';
         this.salesNumStatus = true;
         this.allStatus = true;
         if (this.shopPriceStatus) {
            this.paramsData.stort = 'ASC';
            this.shopPriceStatus = false;
            this.getListData();
         } else {
            this.shopPriceStatus = true;
            this.paramsData.stort = 'DESC';
            this.getListData();
         }
      }
   }
   openMenu(e) {
      e.stopPropagation();
      this.menuCtrl.enable(true, 'list');

      this.menuCtrl.toggle();
   }
   goCarPage() {
      this.navCtrl.push('CarPage');
   }
}
