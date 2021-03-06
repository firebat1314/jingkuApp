import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, Searchbar, Nav, Events, IonicPage, FabButton, App } from 'ionic-angular';

import { HttpService } from "../../providers/http-service";
import { Native } from "../../providers/native";
/*
  Generated class for the Classify page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage({
  segment:'classify'
})
@Component({
  selector: 'page-classify',
  templateUrl: 'classify.html'
})
export class ClassifyPage {
  searchkey: any;
  fore4: any;
  fore3: any;
  fore2: any;
  timer: any;
  brandList: any;
  collectionList: any;//收藏商品列表
  collectionShop: any;//收藏店铺列表

  getCategorys: any;//获取分类信息
  classSelect: any = 'classify';//brand or classify or care
  careSelect: any = 'shop';//shop or goods

  root = 'SubnavPage1Page';

  showBackBtn: boolean = false;//显示分类栏返回按钮
  showCheckBox: boolean = false;//显示取消关注复选框

  selectedShopArr: Array<any>;
  selectedGoodsArr: Array<any>;


  @ViewChild('mySearchBar') mySearchBar: Searchbar;
  @ViewChild('myNav') myNav: Nav;
  @ViewChild(Content) content: Content;
  @ViewChild(FabButton) fabButton: FabButton;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public native: Native,
    public app: App,
    private events: Events
  ) {
    this.events.subscribe('classify:selectSegment', (res) => {
      this.classSelect = res;
    })
  }
  ionViewDidEnter(){
     this.app.setTitle('分类');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifyPage');
  }
  ngOnInit(){
    this.getHttpData();
  }
  ngAfterViewInit() {
    /* 回到顶部按钮 */
    this.fabButton.setElementClass('fab-button-out', true);
    this.content.ionScroll.subscribe((d) => {
      this.fabButton.setElementClass("fab-button-in", d.scrollTop >= d.contentHeight);
    });
    /* 返回按钮解决办法 */
    this.timer = setInterval(() => {
      if (!this.myNav || !this.myNav.canGoBack()) {
        this.showBackBtn = false;
      } else {
        this.showBackBtn = true;
      }
    }, 1000)
  }
  ngOnDestroy() {
    clearInterval(this.timer);
  }
  getHttpData(finished?) {
    this.httpService.getCategorys().then((res) => {
      if (res.status == 1) { this.getCategorys = res.data; }
      this.httpService.getHomebanner({ int_pos_id: 49,app:1 }).then((res) => {
        if (res.status == 1) { this.fore2 = res.data; }
        this.httpService.getHomebanner({ int_pos_id: 50,app:1 }).then((res) => {
          if (res.status == 1) { this.fore3 = res.data; }
          this.httpService.getHomebanner({ int_pos_id: 51,app:1 }).then((res) => {
            if (res.status == 1) { this.fore4 = res.data; }
            this.httpService.brandList().then((res) => {
              if (res.status == 1) { this.brandList = res }
              this.httpService.collectionShop({ size: 10 }).then((res) => {
                if (res.status == 1) { this.collectionShop = res; }
                this.httpService.collectionList({ size: 10 }).then((res) => {
                  if (res.status == 1) { this.collectionList = res; }
                  if (finished) { finished(); }
                })
              })
            })
          })
        })
      })
    })
  }
  /*下拉刷新*/
  doRefresh(refresher?) {
    if (this.classSelect == 'care') {
      this.httpService.collectionShop({ size: 10 }).then((res) => {
        if (res.status == 1) { this.collectionShop = res; }
        this.httpService.collectionList({ size: 10 }).then((res) => {
          if (res.status == 1) { this.collectionList = res; }
          setTimeout(() => { if (refresher) { refresher.complete(); } }, 500);
        })
      })
    } else if (this.classSelect == 'classify') {
      setTimeout(() => {
        refresher.complete();
      }, 500);
    } else if (this.classSelect == 'brand') {
      this.httpService.getCategorys().then((res) => {
        if (res.status == 1) { this.getCategorys = res.data; }
        this.httpService.getHomebanner({ int_pos_id: 49 }).then((res) => {
          if (res.status == 1) { this.fore2 = res.data; }
          this.httpService.getHomebanner({ int_pos_id: 50 }).then((res) => {
            if (res.status == 1) { this.fore3 = res.data; }
            this.httpService.getHomebanner({ int_pos_id: 51 }).then((res) => {
              if (res.status == 1) { this.fore4 = res.data; }
              this.httpService.brandList().then((res) => {
                if (res.status == 1) { this.brandList = res }
                setTimeout(() => { refresher.complete(); }, 500);
              })
            })
          })
        })
      })
    }
  }
  onSrcoll() {
    // console.log(111)
  }
  //转跳品牌列表页
  goToMoreBrand(data) {
    this.navCtrl.push('MoreBrandPage', { data: data })
  }
  toBrandList(id) {
    this.navCtrl.push('BrandListPage', { listId: id })
  }
  //分类页后退按钮
  pop() {
    if (this.myNav.canGoBack()) {
      this.myNav.pop().catch(res => { history.back() });
    }
  }
  /*when care page*/
  checkBoxToggle() {
    this.showCheckBox = !this.showCheckBox;
    this.content.resize();//更新content容器
    console.log('content更新~')
  }
  clickSegment() {
    this.content.resize();//更新content容器
  }
  unfollowShop(suppliers_id, index) {
    this.native.openAlertBox('确认取消关注该商铺', () => {
      this.httpService.delCollectionShop({ shop_ids: [suppliers_id] }).then((res) => {
        if (res.status == 1) {
          this.native.showToast('已取消关注~')
          this.doRefresh();
        }
      })
    })
  }
  unfollowGoods(goods_id, index) {
    this.native.openAlertBox('确认取消关注该商品', () => {
      this.httpService.delCollectionGoods({ rec_ids: [goods_id] }).then((res) => {
        if (res.status == 1) {
          this.native.showToast('已取消关注~')
          this.doRefresh();
        }
      })
    })
  }
  joinCar(goods_id) {
    this.navCtrl.push('ParticularsPage', { goodsId: goods_id });
  }
  //批量取消关注按钮
  confirmForCollection() {
    this.selectedShopArr = [];
    this.selectedGoodsArr = [];
    if (this.careSelect == 'shop') {
      this.native.openAlertBox('是否取消关注选中店铺？', () => {
        this.httpService.delCollectionShop({ shop_ids: this.selectedShopArr }).then((res) => {
          if (res.status == 1) {
            this.native.showToast('已取消关注~');
            this.doRefresh();
          }
        })
      })
      for (let i = 0; i < this.collectionShop.data.length; i++) {
        if (this.collectionShop.data[i].selected) {
          this.selectedShopArr.push(this.collectionShop.data[i].csid)
        }
      }
    }
    if (this.careSelect == 'goods') {
      this.native.openAlertBox('是否取消关注选中商品？', () => {
        this.httpService.delCollectionGoods({ rec_ids: this.selectedGoodsArr }).then((res) => {
          if (res.status == 1) {
            this.native.showToast('已取消关注~');
            this.doRefresh();
          }
        })
      })
      for (let i = 0; i < this.collectionList.data.length; i++) {
        if (this.collectionList.data[i].selected) {
          this.selectedGoodsArr.push(this.collectionList.data[i].rec_id)
        }
      }
    }

  }
  /* 商品搜索 */
  searchbar(e) {
    if (e) {
      if (e.keyCode == 13) {
        this.navCtrl.push('BrandListPage', { keyword: this.searchkey })
      }
    } else {
      this.navCtrl.push('BrandListPage', { keyword: this.searchkey })
    }
  }
}
