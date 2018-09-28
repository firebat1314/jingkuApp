import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Content, IonicPage, FabButton } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { MineProvider } from '../../../providers/mine/mine';

/**
 * Generated class for the DistributionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
   selector: 'page-distribution',
   templateUrl: 'distribution.html',
})
export class DistributionPage {
   infiniteScroll: any;

   category: any;
   data: any;
   selected = 0;
   @ViewChild(Content) content: Content;
   @ViewChild(FabButton) fabButton: FabButton;
   goodsList: any = [];
   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private httpService: HttpService,
      private elementRef: ElementRef,
      private mine: MineProvider,
   ) { }
   ngOnInit() {
      this.httpService.getCategoryDistribution().then((data) => {
         if (data.status) {
            this.category = data;
         }
      })
      this.getData(this.selected);
   }
   ionViewDidLoad() {
      console.log('ionViewDidLoad FastbuyPage');
   }
   ngAfterViewInit() {
      /* 回到顶部按钮 */
      this.fabButton.setElementClass('fab-button-out', true);
      this.content.ionScroll.subscribe((d) => {
         this.fabButton.setElementClass("fab-button-in", d.scrollTop >= d.contentHeight);
      });
   }
   getData(id) {
      this.infiniteScroll ? this.infiniteScroll.enable(true) : null;
      this.httpService.category_goods_d({ page: 1, num: 10, cat_id: id }).then((res) => {
         if (res.status == 1) {
            this.selected = id;
            this.data = res;
            this.goodsList = res.goods;
         }
      })
   }
   goParticularsPage(id) {
      this.navCtrl.push('ParticularsPage', { goodsId: id, isActivity: 1 })
   }
   scrollToTop() {
      this.content.scrollToTop();
   }
   doInfinite(infiniteScroll) {
      this.infiniteScroll = infiniteScroll;
      if (this.data.page < this.data.pages) {
         let page = this.data.page
         this.httpService.category_goods_d({ num: 10, page: ++page, cat_id: this.selected }, { showLoading: false }).then((res) => {
            setTimeout(() => {
               this.infiniteScroll.complete();
            }, 500);
            if (res.status == 1) {
               this.data = res;
               this.goodsList = [...this.goodsList, ...res.goods];
            }
         })
      } else {
         this.infiniteScroll.enable(false);
      }

   }
}
