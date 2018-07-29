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
   goodsTypeChange() {
      setTimeout(() => {
         this.mySearchBar.setFocus();
      }, 500);
      let type = 'goods';
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
   searchKeyChange(e) {
      this.httpService.searchList({ keywords: this.myHomeSearch }).then(res => {
         if (res.status) {
            this.searchData = res;
         }
      })
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
}
