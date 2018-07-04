import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";

/**
 * Generated class for the BrandPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-brand',
  templateUrl: 'brand.html',
})
export class BrandPage {
  searchkey: any;
  fore2: any;
  fore3: any;
  fore4: any;
  brandList: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public native: HttpService,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrandPage');
  }
  ngOnInit() {
    this.getData();
  }

  getData() {
    return this.httpService.getHomebanner({ int_pos_id: 49, app: 1 }).then((res) => {
      if (res.status == 1) { this.fore2 = res.data; }
      this.httpService.getHomebanner({ int_pos_id: 50, app: 1 }).then((res) => {
        if (res.status == 1) { this.fore3 = res.data; }
        this.httpService.getHomebanner({ int_pos_id: 51, app: 1 }).then((res) => {
          if (res.status == 1) { this.fore4 = res.data; }
          return this.httpService.brandList().then((res) => {
            if (res.status == 1) { this.brandList = res }
          })
        })
      })
    })
  }
  goSearchPage() {
     // this.modalCtrl.create('SearchPage', '', { enterAnimation: '' }).present();
     this.navCtrl.push('SearchPage', {}, { animate:false,animation: 'md-transition' })
  }
  /* 下拉刷新 */
  doRefresh(refresher) {
    this.getData().then(() => {
      setTimeout(() => {
        refresher.complete();
      }, 500)
    })
  }
  /* 商品搜索 */
  searchbar(e) {
    if (e.keyCode == 13) {
      this.navCtrl.push('BrandListPage', { keyword: this.searchkey })
    }
  }
  goToMoreBrand(data) {
    this.navCtrl.push('MoreBrandPage', { data: data });
  }
}
