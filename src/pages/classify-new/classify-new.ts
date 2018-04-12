import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, Events } from 'ionic-angular';
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
  childrenCaCtegory: any;
  getCategorys: any;
  selectedId: number = 0;
  searchkey;
  fore4: any;
  fore3: any;
  fore2: any;
  timer: any;
  brandList: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public native: Native,
    private events: Events
  ) { }

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
    if(item.is_cutting>0){
      this.navCtrl.push('BrandListPage',{cut:1})
    }else{
      this.selectedId = item.cat_id;
    }
    this.getChildrenCaCtegory().then((res) => {
    })
  }
  doRefresh(refresher) {
    this.httpService.getCategorys().then((res) => {
      if (res.status == 1) {
        this.getCategorys = res.data;
        this.httpService.setStorage('getCategorys', res);
        this.getChildrenCaCtegory().then((res) => {
          setTimeout(function () {
            refresher.complete();
          }, 500);
        });
      }
    })
  }
  //转跳品牌列表页
  goMoreBrand(data) {
    this.navCtrl.push('MoreBrandPage', { data: data })
  }
  goBrandList(id) {
    this.navCtrl.push('BrandListPage', { listId: id })
  }
  goParticularsPage(goods_id) {
    this.navCtrl.push('ParticularsPage', { goodsId: goods_id });
  }
}
