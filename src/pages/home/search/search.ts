import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Searchbar, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { ViewController } from 'ionic-angular/navigation/view-controller';

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
   selector: 'page-search',
   templateUrl: 'search.html',
})
export class SearchPage {
   page: any = 1;
   data: any;
   myHomeSearchinfo:string='';
   myHomeSearch: String = this.navParams.get('key') || '';
   goodsTypeSelect = this.navParams.get('type') || '1';
   @ViewChild(Searchbar) mySearchBar: Searchbar;

   callback = this.navParams.get('callback');
   searchData: any;
   historyData: any;

   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private httpService: HttpService,
      private viewCtrl: ViewController,
   ) { }

   ngOnInit() {
      this.getHotSearch();
      this.httpService.searchList().then(res => {
         if (res.status) {
            this.historyData = res;
         }
      });
      this.myHomeSearch && this.httpService.searchList({ keywords: this.myHomeSearch }).then(res => {
         if (res.status) {
            this.searchData = res;
         }
      });
   }
   ngAfterViewInit() {
      setTimeout(() => {
         this.mySearchBar.setFocus();
      }, 800);
   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad SearchPage');
   }
   searchbar(e) {
      if (this.callback) {
         return this.viewCtrl.dismiss({}, '', { animate: false }).then(res => {
            this.callback.search(this.myHomeSearch, this.goodsTypeSelect);
         });
      }
      switch (this.goodsTypeSelect) {
         case '1': this.navCtrl.push('BrandListPage', { keyword: this.myHomeSearch }, { animate: false }).then(() => {
            this.httpService.search_census({ type: 'goods', search_name: this.myHomeSearch });
            this.viewCtrl.dismiss({}, '', { animate: false })
         }); break;
         case '2': this.navCtrl.push('BrandListPage', { keyword: this.myHomeSearch, cut: 1 }, { animate: false }).then(() => {
            this.httpService.search_census({ type: 'cutting', search_name: this.myHomeSearch });
            this.viewCtrl.dismiss({}, '', { animate: false })
         }); break;
         case '3': this.navCtrl.push('BrandListPage', { keyword: this.myHomeSearch, isDistribution: 1 }, { animate: false }).then(() => {
            this.httpService.search_census({ type: 'distribution', search_name: this.myHomeSearch });
            this.viewCtrl.dismiss({}, '', { animate: false })
         }); break;
         default: this.navCtrl.push('BrandListPage', { keyword: this.myHomeSearch }, { animate: false }).then(() => {
            this.httpService.search_census({ type: 'goods', search_name: this.myHomeSearch });
            this.viewCtrl.dismiss({}, '', { animate: false })
         }); break;
      }
   }
   ionCancel() {
      this.navCtrl.pop({ animate: false }).catch(() => { history.back(); });
   }
   minides
   goodsTypeChange() {
      setTimeout(() => {
         this.mySearchBar.setFocus();
      }, 500);
      let type = 'goods';
      
      if(this.goodsTypeSelect=="4"){
         this.minides=true
   }else{
      this.minides=false
   }
      switch (this.goodsTypeSelect) {
         case '1': type = 'goods'; break;
         case '2': type = 'cutting'; break;
         case '3': type = 'distribution'; break;
         default: type = 'goods';
            break;
      }
      this.httpService.searchList({ keywords: this.myHomeSearch, type: type }).then(res => {
         if (res.status) {
            this.searchData = res;
         }
      })
   }
   suppliers_listinfo

   suppliers_listinfolenths
   
   alinks(){
      this.httpService.categoryGoods({keywords:this.myHomeSearchinfo,is_info:1}).then((res)=>{
      //   console.log(res.suppliers_list)
      console.log(res)
         this.suppliers_listinfo=res.suppliers_list
         this.suppliers_listinfolenths=res.suppliers_list
         // this.suppliers_listinfoID=res.suppliers_list.id
         console.log(this.suppliers_listinfo)
      })
      // this.routers.navigate(['/indexpage']);
   }
   searchKeyChange(e) {
      if(e.placeholder=='搜索商铺'){
         this.httpService.categoryGoods({keywords:this.myHomeSearchinfo,is_info:1}).then((res)=>{
            //   console.log(res.suppliers_list)
            console.log(res)
               this.suppliers_listinfo=res.suppliers_list
               this.suppliers_listinfolenths=res.suppliers_list
               // this.suppliers_listinfoID=res.suppliers_list.id
               console.log(this.suppliers_listinfo)
            })
      }else{
         this.httpService.searchList({ keywords: this.myHomeSearch }).then(res => {
            if (res.status) {
               this.searchData = res;
            }
         })
      }
   
   }
   getHotSearch() {
      this.httpService.getHotSearch({
         size: 10,
         page: this.page
      }).then((res) => {
         // console.log(res)
         if (res.status == 1) {
            this.data = res;
         }
      })
   }
   getNewBatch() {
      this.page < this.data.pagers ? ++this.page : this.page = 1;
      this.getHotSearch();
   }
   delItem(id, slidingItem) {
      this.httpService.delSearch({ id: id }).then((res) => {
         if (res.status) {
            slidingItem.close();
            this.httpService.searchList().then(res => {
               if (res.status) {
                  this.historyData = res;
               }
            });
         }
      });
   }
   delItems() {
      this.httpService.delAllSearch().then((res) => {
         if(res.status==1){
            this.httpService.searchList().then(res => {
               if (res.status) {
                  this.historyData = res;
               }
            });
         }
      });
   }
   goParticularsHome(suppliers_listinfoID,showloading=true) {

      this.navCtrl.push('ParticularsHomePage', { suppliersId: suppliers_listinfoID });
   }
}
