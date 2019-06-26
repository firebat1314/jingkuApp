import { Component, ElementRef, Renderer } from '@angular/core';
import { NavController, NavParams, IonicPage,Events } from 'ionic-angular';
import { HttpService } from '../../../providers/http-service';
import { MineProvider } from '../../../providers/mine/mine';
import { AdsClickDirective } from '../../../directives/ads-click/ads-click';

/**
 * Generated class for the NewProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
   selector: 'page-new-product',
   templateUrl: 'new-product.html',
   providers: [AdsClickDirective]
})
export class NewProductPage {
   receiptTool: any = 'receiptSskFor';//or receiptSskFor or receiptList or receiptInfo
   data: any;
   category:any;
   brands:any;
   selected:any;
   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private httpSrv: HttpService,
      public mine: MineProvider,
      private el: ElementRef,
      private render: Renderer,
      private adsClick: AdsClickDirective,
      public events: Events,
   ) {
   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad NewProductPage');
   }
   ngOnInit() {
      this.newproduct()
     this.newArea()
     this.getData(0,'');
   }
   getHttpData() {
      if (this.receiptTool == 'receiptSskFor') { //点击品牌更新的时候
         return this.httpSrv.venuenews({  tag: 'brand'}).then((res)=>{
            this.category=res.response.cate;   //列表
            this.brands=res.response.list;
         })
      }
      if (this.receiptTool == 'receiptList') {  //点击店铺更新的时候
         return this.httpSrv.venuenews({  tag: 'supplier'}).then((res)=>{
            this.category=res.response.cate;   //列表
               this.brands=res.response.list;
         })
      }
    }
    //列表接口获取
    newproduct(){
         return this.httpSrv.venuenews({  tag: 'brand'}).then((res)=>{
               this.category=res.response.cate;   //列表
               this.brands=res.response.list;
         })
    }
   //  bander图接口
    newArea(){
      this.httpSrv.newArea().then(res => {
         this.data = res;
      })
    }
   //  点击筛选接口
   getData(id,names) {
      this.httpSrv.venuenews({cate: id ,tag:names}).then((res) => {
         if (res.status == 1) {
            this.selected=id
            this.category=res.response.cate;   //列表
            this.brands=res.response.list;
         }
      })
   }
    //跳往商品详情
    gotoplays(id){
       this.navCtrl.push('ParticularsPage', { goodsId: id })
 }
   //跳往店铺
   goParticularsHomePage(id) {
      this.navCtrl.push('ParticularsHomePage', { suppliersId: id })
   }
   //品牌搜索
   filterParams: any = {
		min_price: null,
		max_price: null,
		brand_id: 4850,
		// cat_id: null,
		attr_id: null,
		filter: null
	}
   searchbar(searchkey,label_id) {
    this.navCtrl.push('BrandListPage',{brand_id:label_id,order: "new" });
         // this.navCtrl.push('BrandListPage', { listId:label_id})
      
         
   }
   // confirm() {
	// 	var filter = [];
	// 	debugger
	// 	this.filterParams.filter = '';
	// 	var data = this.data.goods_attr_arr[3]?this.data.goods_attr_arr[3].data:[];
	// 	for (let i = 0; i < data.length; i++) {
	// 		if (data[i].selectedid) {
	// 			filter.push(data[i].selectedid);
	// 		}
	// 	}
	
	// 	this.navCtrl.push('BrandListPage', this.filterParams);
	// 	console.log("我一共选择了：", this.filterParams);

	// }
  
}
