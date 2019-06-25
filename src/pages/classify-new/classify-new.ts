import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, Events, App, MenuController } from 'ionic-angular';
import { HttpService } from '../../providers/http-service';
import { Native } from '../../providers/native';

/**
 * Generated class for the ClassifyNewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
   selector: 'page-classify-new',
   templateUrl: 'classify-new.html',
})
export class ClassifyNewPage {
   is_cutting: any;
   childrenCaCtegory: any;
   getCategorys: any;
   selectedId: number = 0;
   searchkey = '';
   brandList: any;

   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public httpService: HttpService,
      public native: Native,
      public app: App,
      private events: Events,
      public menuCtrl: MenuController
   ) { }

   ionViewDidEnter() {
      this.app.setTitle('分类');
   }
   ionViewDidLoad() {
      console.log('ionViewDidLoad ClassifyNewPage');
   }

   /* 商品搜索 */
   searchbar(e) {
      if (e.keyCode == 13) {
         this.navCtrl.push('BrandListPage', { keyword: this.searchkey })
      }
   }
   ngOnInit() {
      this.getHttpData();
   }
   getHttpData() {
      this.httpService.getStorage('getCategorys').then((res) => {
         if (res) {
            this.getCategorys = res.data;
         }
      })
      this.httpService.getStorage('childrenCaCtegory').then((res) => {
         if (res) {
            this.childrenCaCtegory = res.data;
         }
      })
      this.httpService.getCategorys().then((res) => {
         if (res.status == 1) {
            this.getCategorys = res.data;
            this.selectedId = res.data[0].cat_id
            this.httpService.setStorage('getCategorys', res)
            this.getChildrenCaCtegory();
         }
      })
   }
   goSearchPage() {
      // this.modalCtrl.create('SearchPage', '', { enterAnimation: '' }).present();
      this.navCtrl.push('SearchPage', {}, { animate: false, animation: 'md-transition' })
   }
   getChildrenCaCtegory() {
      return this.httpService.getChildrenCaCtegory({ cat_id: this.selectedId }).then((res) => {
         if (res.status == 1) {
            this.childrenCaCtegory = res.data;
            if (this.selectedId == 1) {
               this.httpService.setStorage('childrenCaCtegory', res)
            }
         }
      })
   }
   clickItem(item) {
      this.is_cutting = item.is_cutting;
      this.selectedId = item.cat_id;
      if (this.is_cutting > 0) {
         this.httpService.get_children_category_cutting().then(res => {
            if (res.status == 1) {
               this.childrenCaCtegory = res.data;
            }
         })
         // this.navCtrl.push('BrandListPage',{cut:1})
      } else {
         this.getChildrenCaCtegory().then((res) => { })
      }
   }
   doRefresh(refresher) {
      this.httpService.getCategorys(null, { showLoading: false }).then((res) => {
         if (res.status == 1) {
            this.getCategorys = res.data;
            this.httpService.setStorage('getCategorys', res);

            if (this.is_cutting > 0) {
               this.httpService.get_children_category_cutting(null, { showLoading: false }).then(res => {
                  if (res.status == 1) {
                     this.childrenCaCtegory = res.data;
                     setTimeout(function () {
                        refresher.complete();
                     }, 500);
                  }
               })
            } else {
               this.getChildrenCaCtegory().then((res) => {
                  setTimeout(function () {
                     refresher.complete();
                  }, 500);
               });
            }
         }
      })
   }
   //转跳品牌列表页
   goMoreBrand(data) {
      this.navCtrl.push('MoreBrandPage', { data: data })
   }
   openCategoryMeun(item) {
      debugger
      this.menuCtrl.enable(true, 'category');
      this.events.publish('classifyNew:cateFilter', item);
      this.menuCtrl.toggle();

   }
   goBrandList(item) {
      debugger
      if (this.is_cutting > 0) {
         this.navCtrl.push('BrandListPage', { brandId: item.brand_id, cut: 1 })
      } else {
         this.navCtrl.push('BrandListPage', { listId: item.cat_id })
      }
   }
   goParticularsPage(goods_id) {
      this.navCtrl.push('ParticularsPage', { goodsId: goods_id });
   }
}
