import { Component, Renderer, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, PopoverController, Content, FabButton } from 'ionic-angular';
import { HttpService } from "../../providers/http-service";
import { Native } from "../../providers/native";
import { ChatProvider } from '../../providers/chat/chat';
import { MineProvider } from '../../providers/mine/mine';

/**
 * Generated class for the ParticularsHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
   segment: 'page-particulars-home/:suppliersId'
})
@Component({
   selector: 'page-particulars-home',
   templateUrl: 'particulars-home.html',
})
export class ParticularsHomePage {
   mytool = 'all';
   myHomeSearch: any;
   alldata: any;
   newdata: any;
   cxdata: any;
   typeNumber: any = '0';
   newType: any = '1';
   alltool = 'all';
   listStyleflag: Boolean;

   paramsData = {
      size: 30,
      page: 1,
      supp_cat_id: null,
      order: null,
      stort: 'DESC',
      keywords: this.myHomeSearch,
      suppliers_id: null
   }

   suppliers_id = this.navParams.get('suppliersId');
   data: any;
   shopdata: any;
   classShop: any = "shopHome";
   defaultSelect: string = this.navParams.get('type');

   @ViewChild(Content) content: Content;
   @ViewChild('goBackTop') fabButton: FabButton;

   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public events: Events,
      public native: Native,
      private el: ElementRef,
      private renderer: Renderer,
      private httpService: HttpService,
      public popoverCtrl: PopoverController,
      private chat: ChatProvider,
      private mine: MineProvider,
   ) { }
   ngOnInit() {
      if (this.defaultSelect) {
         this.classShop = this.defaultSelect;
      }
      this.getHomeData();
      this.getShopData();

      this.changeType(this.typeNumber);
      this.NewType(this.newType);
      //筛选菜单数据传输
      /* this.events.subscribe('user:filterParams', (res) => {
        this.paramsData = Object.assign(this.paramsData, res);
        console.log(this.paramsData)
        this.alldata.page = 1;
        this.mytool = 'all';
        this.paramsData.stort = 'DESC';
        this.getAllData();
      }); */
      /* 更新店铺收藏的状态 */
      this.events.subscribe('particulars-home-details:update-collect', () => {
         this.getShopData();
      })
      this.httpService.suppliersCategoryGoods(Object.assign(this.paramsData, { suppliers_id: this.suppliers_id })).then((res) => {
         if (res.status == 1) {
            this.alldata = res;
            // this.events.publish('user:listFilter', res);
         }
      })
   }
   ionViewDidLoad() {
      console.log('ionViewDidLoad ParticularsHomePage');
   }
   ionViewDidLeave() {
      this.events.unsubscribe('user:filterParams');//防止多次订阅事件
      this.events.unsubscribe('particulars-home-details:update-collect');//防止多次订阅事件
   }
   ngAfterViewInit() {

   }
   getHomeData() {
      this.httpService.suppliersIndex({ suppliers_id: this.suppliers_id }).then((res) => {
         if (res.status == 1) {
            this.data = res;
         }
      })
   }
   getShopData() {
      this.httpService.CatrgorySupplierInfo({ suppliers_id: this.suppliers_id }).then((res) => {
         if (res.status == 1) {
            this.shopdata = res;
         }
      })
   }
   openPopover(myEvent) {
      // console.log(this.alldata.suppliers_cat_list.length==0)
      if (this.alldata.suppliers_cat_list.length == 0) {
         this.native.showToast('该店铺暂无热门分类哦', null, false);
         return;
      }
      myEvent.stopPropagation();
      let popover = this.popoverCtrl.create('StoreHomePopoverPage', { data: this.alldata.suppliers_cat_list }, { cssClass: 'store-home-popover-style' });
      popover.present({
         ev: myEvent
      });
      popover.onDidDismiss(supp_cat_id => {
         if (supp_cat_id) {
            if (supp_cat_id == 'all') {
               this.paramsData.supp_cat_id = null;
            } else {
               this.paramsData.supp_cat_id = supp_cat_id;
            }
            this.classShop = 'allGoods';
            this.getAllData();
         }
      })
   }
   collectStore(is_collect) {
      if (is_collect) {
         this.httpService.CollectShop({ id: this.suppliers_id, type: 0 }).then((res) => {
            if (res.status) {
               this.native.showToast('取消收藏', null, false);
               this.getShopData();
            }
         })
      } else {
         this.httpService.CollectShop({ id: this.suppliers_id, type: 1 }).then((res) => {
            if (res.status) {
               this.native.showToast('收藏成功', null, false);
               this.getShopData();
            }
         })
      }
   }
   callnumber(number) {
      if (number) {
         if (this.native.isMobile()) {
            this.native.openAlertBox('拨打商家电话:' + number, () => {
               this.native.openCallNumber(number, false);
            })
         } else {
            location.href = 'tel:' + number;
         }

      } else {
         this.native.showToast('该商家暂无电话');
      }
   }
   changeType(typeNumber) {
      this.httpService.suppliersPromote({ suppliers_id: this.suppliers_id, type: typeNumber }).then((res) => {
         if (res.status == 1) {
            this.cxdata = res;
         }
      })
   }
   NewType(newType) {
      this.httpService.suppliersCategoryGoods({ suppliers_id: this.suppliers_id, new: newType }).then((res) => {
         if (res.status == 1) {
            this.newdata = res;
         }
      })
   }

   getAllData(params?) {
      this.httpService.suppliersCategoryGoods(Object.assign(this.paramsData, params)).then((res) => {
         if (res.status == 1) {
            this.alldata = res;
            if (res.goods.length == 0) {
               this.native.showToast('抱歉！没有查询到商品');
            }
            // this.events.publish('user:listFilter', res);
         }
      })
   }


   classShopChange() {
      if (this.classShop == 'cuXiao') {
         let that = this;
         setTimeout(function () {
            let cuXiaoTabs = that.el.nativeElement.getElementsByClassName('cuXiao-tabs-item');
            for (let x = 0; x < cuXiaoTabs.length; x++) {
               cuXiaoTabs[x].index = x;
               cuXiaoTabs[0].className = 'cuXiao-tabs-item actived';
               cuXiaoTabs[x].onclick = function () {
                  for (let y = 0; y < cuXiaoTabs.length; y++) {
                     cuXiaoTabs[y].className = 'cuXiao-tabs-item';
                  }
                  this.className = 'cuXiao-tabs-item actived';
                  that.typeNumber = this.index;
                  that.changeType(that.typeNumber);
                  //console.log(this.value);
                  //that.classShop =String(this.value)  
               }
            }
         }, 500);
      }
      if (this.classShop == 'allGoods') {
         /* this.httpService.suppliersCategoryGoods({
           size: 30,
           page: 1,
           stort: 'DESC',
           suppliers_id: this.suppliers_id
         }).then((res) => {
           if (res.status == 1) {
             this.alldata = res;
             if (res.goods.length == 0) {
               this.native.showToast('抱歉！没有查询到商品');
             }
             // this.events.publish('user:listFilter', res);
           }
         }) */
      }
   }
   doInfinite(infiniteScroll) {
      if (this.classShop == "allGoods") {
         let page = this.alldata.page;
         if (page < this.alldata.pages) {
            this.httpService.suppliersCategoryGoods(Object.assign(this.paramsData, { page: ++this.alldata.page, suppliers_id: this.suppliers_id })).then((res) => {
               if (res.status == 1) {
                  this.alldata.page = res.page;
                  this.alldata.goods = this.alldata.goods.concat(res.goods);
                  //Array.prototype.push.apply(this.alldata.goods, res.goods);
               }
               setTimeout(() => {
                  infiniteScroll.complete();
               }, 500);
            })
         } else {
            infiniteScroll.enable(false);
         }
      }
      else if (this.classShop == "goNew") {
         let page = this.newdata.page;
         if (page < this.newdata.pages) {
            this.httpService.suppliersCategoryGoods({ suppliers_id: this.suppliers_id, new: 1, page: ++page }).then((res) => {
               if (res.status == 1) {
                  this.newdata.page = res.page;
                  this.newdata.goods = this.newdata.goods.concat(res.goods);
                  //Array.prototype.push.apply(this.newdata.goods, res.goods);
               }
               setTimeout(() => {
                  infiniteScroll.complete();
               }, 1500);
            })
         } else {
            infiniteScroll.enable(false);
         }
      }
      else if (this.typeNumber == 0) {
         let page = this.cxdata.page;
         if (page < this.cxdata.pages) {
            this.httpService.suppliersCategoryGoods(Object.assign(this.paramsData, { page: ++this.cxdata.page, type: 0, suppliers_id: this.suppliers_id })).then((res) => {
               if (res.status == 1) {
                  this.cxdata.page = res.page;
                  this.cxdata.goods_list = this.cxdata.goods_list.concat(res.goods_list);
                  //Array.prototype.push.apply(this.cxdata.goods_list, res.goods_list);

               }
               setTimeout(() => {
                  infiniteScroll.complete();
               }, 1500);
            })
         } else {
            infiniteScroll.enable(false);
         }
      }
      else if (this.typeNumber == 1) {
         let page = this.cxdata.page;
         if (page < this.cxdata.pages) {
            this.httpService.suppliersCategoryGoods(Object.assign(this.paramsData, { page: ++this.cxdata.page, type: 1, suppliers_id: this.suppliers_id })).then((res) => {
               if (res.status == 1) {
                  this.cxdata.page = res.page;
                  //Array.prototype.push.apply(this.cxdata.goods_list, res.goods_list);
                  this.cxdata.goods_list = this.cxdata.goods_list.concat(res.goods_list);
               }
               setTimeout(() => {
                  infiniteScroll.complete();
               }, 1500);
            })
         } else {
            infiniteScroll.enable(false);
         }
      }
      else if (this.typeNumber == 2) {
         let page = this.cxdata.page;
         if (page < this.cxdata.pages) {
            this.httpService.suppliersCategoryGoods(Object.assign(this.paramsData, { page: ++this.cxdata.page, type: 2, suppliers_id: this.suppliers_id })).then((res) => {
               if (res.status == 1) {
                  this.cxdata.page = res.page;
                  //Array.prototype.push.apply(this.cxdata.goods_list, res.goods_list);
                  this.cxdata.goods_list = this.cxdata.goods_list.concat(res.goods_list);
               }
               setTimeout(() => {
                  infiniteScroll.complete();
               }, 1500);
            })
         } else {
            infiniteScroll.enable(false);
         }
      }
      else if (this.typeNumber == 3) {
         let page = this.cxdata.page;
         if (page < this.cxdata.pages) {
            this.httpService.suppliersCategoryGoods(Object.assign(this.paramsData, { page: ++this.cxdata.page, type: 3, suppliers_id: this.suppliers_id })).then((res) => {
               if (res.status == 1) {
                  this.cxdata.page = res.page;
                  //Array.prototype.push.apply(this.cxdata.goods_list, res.goods_list);
                  this.cxdata.goods_list = this.cxdata.goods_list.concat(res.goods_list);
               }
               setTimeout(() => {
                  infiniteScroll.complete();
               }, 1500);
            })
         } else {
            infiniteScroll.enable(false);
         }
      }
   }
   // doRefresh(refresher) {
   // 	this.httpService.suppliersCategoryGoods((this.paramsData ,{new:1,suppliers_id: this.suppliers_id})).then((res) => {
   // 		if (res.status == 1) {
   // 			this.alldata = res;
   // 		}
   // 		setTimeout(() => {
   // 			refresher.complete();
   // 		}, 500);
   // 	})
   // }

   onInput(event) {
      this.searchGoods()
   }
   searchGoods() {
      this.alldata.page = 1;
      this.paramsData = {
         size: 30,
         page: 1,
         supp_cat_id: null,
         order: null,
         stort: 'DESC',
         keywords: this.myHomeSearch,
         suppliers_id: this.suppliers_id
      }
      this.httpService.suppliersCategoryGoods(Object.assign(this.paramsData, { suppliers_id: this.suppliers_id })).then((res) => {
         this.alldata = res;
         this.classShop = 'allGoods';
         // this.events.publish('user:listFilter', res);
      })
   }


   all_Status = true;
   sales_NumStatus = true;
   shop_PriceStatus = true;
   alltoolChange() {
      this.paramsData.page = 1;
      if (this.alltool == 'all') {
         this.paramsData.order = '';
         this.sales_NumStatus = true;
         this.shop_PriceStatus = true;
         this.paramsData.stort = 'DESC';

         this.getAllData();
      }

      if (this.alltool == 'goods_sort') {
         this.paramsData.order = 'goods_sort';
         this.paramsData.stort = 'DESC';
         this.getAllData();
      }
      if (this.alltool == 'sales_num') {
         this.paramsData.order = 'sales_num';
         this.shop_PriceStatus = true;
         this.all_Status = true;
         this.paramsData.stort = 'DESC';


         this.getAllData();
      }
      if (this.alltool == 'shop_price') {
         this.paramsData.order = 'shop_price';
         this.sales_NumStatus = true;
         this.all_Status = true;
         if (this.shop_PriceStatus) {
            this.paramsData.stort = 'ASC';
            this.shop_PriceStatus = false;
            this.getAllData();
         } else {
            this.shop_PriceStatus = true;
            this.paramsData.stort = 'DESC';
            this.getAllData();
         }
      }
   }

   goParticularsPage(goods_id) {
      this.navCtrl.push('ParticularsPage', { goodsId: goods_id })
   }
   goParticularsHomeDetails() {
      this.navCtrl.push('ParticularsHomeDetailsPage', { suppliersId: this.suppliers_id });
   }
   goAccountServicePage() {
      //  this.chat.qimoChatSDK(this.shopdata.data.access_id,this.shopdata.data.name,this.shopdata.data.logo);
      this.chat.webim({
         supplier_id: this.shopdata.data.id,
      });
   }
}
