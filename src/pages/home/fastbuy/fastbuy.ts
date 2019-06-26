import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Content, IonicPage, FabButton } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { MineProvider } from '../../../providers/mine/mine';
import Swiper from 'swiper';
/*
  Generated class for the Fastbuy page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
   selector: 'page-fastbuy',
   templateUrl: 'fastbuy.html'
})
export class FastbuyPage {

   bannerImgs;//轮播图
   response:any;
   infiniteScroll: any;
   size: any = 10;
   receiptTool: any = 'receiptSskFor';//or receiptSskFor or receiptList or receiptInfo
   category: any;
   data: any;
   selected = 0;
   page = 1;
   trynow:boolean=true;
   @ViewChild(Content) content: Content;
   @ViewChild(FabButton) fabButton: FabButton;
   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private httpService: HttpService,
      private elementRef: ElementRef,
      private mine: MineProvider,
   ) { }
   ngOnInit() {
      this.httpService.getCategoryPromote().then((data) => {
         if (data.status) {
            this.category = data;
            console.log(this.category,'111111111111111111111111111111111111111111111')
         }
      })
      this.getData(this.selected);
      this.venues()
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
      this.page = 1;

      this.infiniteScroll ? this.infiniteScroll.enable(true) : null;

      this.httpService.presell({ page: this.page, num: this.size, type: 'is_promote', cat_id: id }).then((res) => {
         if (res.status == 1) {
            this.selected = id;
            this.data = res;
         }
      })
   }
 
 
   scrollToTop() {
      this.content.scrollToTop();
   }
  

   receiptTools(){
      if(this.receiptTool=='receiptSskFor'){
         this.trynow=true
      }else{
         this.trynow=false
      }
      
   }
   doInfinite(infiniteScroll) {
      this.infiniteScroll = infiniteScroll;
      this.httpService.presell({ num: this.size, page: ++this.page, type: 'is_promote', cat_id: this.selected }, { showLoading: false }).then((res) => {
         if (res.status == 1) {
            if (!res.data.length) {
               this.infiniteScroll.enable(false);
            }
            this.data.data = this.data.data.concat(res.data);
         }
         setTimeout(() => {
            this.infiniteScroll.complete();
         }, 500);
      })
   }
   goParticularsPage(id) {
      this.navCtrl.push('ParticularsPage', { goodsId: id, isActivity: 1 })
   }
   // 限时专场
   venues(){
      return this.httpService.venue().then((res)=>{
         // console.log(res)
         debugger
         this.bannerImgs = res.data.banner;
         this.response=res.data.response;
         console.log(this.response)
      })
   }
   // 详情页
   gotoinfo(id){
      console.log(id)
      this.navCtrl.push('fastbuy_infonPage',{venumid:id})
   }
}
