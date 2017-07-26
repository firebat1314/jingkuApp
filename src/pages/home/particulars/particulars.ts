import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, Events, IonicPage, Content, FabButton } from 'ionic-angular';
/*http服务*/
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";

declare var Swiper: any;
@IonicPage({
  segment: 'page-particulars/:goodsId'
})
@Component({
  selector: 'page-particulars',
  templateUrl: 'particulars.html'
})
export class ParticularsPage {
  @ViewChild(Content) content: Content;
  @ViewChild(FabButton) fabButton: FabButton;

  region_name: any;
  getCategoryRecommendGoodsHot: any;
  getLinkedGoods: any;
  getGoodsAttribute: any;
  getGoodsGallery: any;
  getPriceSection: any;
  getGoodsInfo: any;
  getGoodsParameter: any;
  getGoodsSaleCity: any;
  getSupplierInfo: any;
  getBonus: any;
  getGoodsFittings: any;
  collectDel: any;
  searchGoods: any;
  care: any;

  selectGroupRecommend = "group" || 'recommend';
  selectPicArguments = "pic";

  goodsId: number;
  badgeCount: number;

  //存储swiper对象
  mySwiper: any = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpService,
    public modalCtrl: ModalController,
    public native: Native,
    private events: Events
  ) {
    this.goodsId = this.navParams.get('goodsId') || '3994';/*3994 5676*/
    console.log("商品ID:", this.goodsId);
  }
  ngAfterViewInit() {
    /* 回到顶部按钮 */
    this.fabButton.setElementClass('fab-button-out',true);
    this.content.ionScroll.subscribe((d) => {
      this.fabButton.setElementClass("fab-button-in", d.scrollTop >= d.contentHeight);
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ParticularsPage');
    this.http.getFlowGoods().then((res) => {//获取购物车数量
      this.badgeCount = res.total.real_goods_count;
    })
    this.events.subscribe('car:goodsCount', (res) => {
      this.badgeCount = res;
    })
  }
  ionViewCanEnter() {
    return this.getHttpDetails().then((res) => {
      return true;
    }, (res) => {
      this.native.showToast(res);
      return false;
    }).catch((res) => {
      this.native.showToast('未知参数错误');
      return false;
    });
  }
  ngOnDestroy() {
    this.events.unsubscribe('particulars:goCarPage');
  }
  getHttpDetails(finished?) {
    return new Promise((resolve, reject) => {
      this.native.showLoading();
      this.http.goodsInfos({ goods_id: this.goodsId }).then((res) => {
        // console.log("商品详情信息", res);
        this.native.hideLoading();
        if (res.status == 1) {
          resolve(res.status);
          this.getGoodsInfo = res;
          this.getRegionName(res);
        } else {
          reject(res.info);
        }
        this.http.getCategoryRecommendGoodsHot({}).then((res) => {
          // console.log('为你推荐：', res)
          if (res.status == 1) { this.getCategoryRecommendGoodsHot = res.data; }
          if (finished) { finished() }
        })
      })
    });
  }
  getRegionName(res) {
    for (var i = 0; i < res.sale_city.length; i++) {
      if (res.sale_city[i].selected == 1) {
        this.region_name = res.sale_city[i].region_name;
      }
    }
  }
  /*下拉刷新*/
  doRefresh(refresher) {
    this.getHttpDetails(() => {
      setTimeout(() => {
        refresher.complete();
      }, 500);
    });
  }
  presentModal(str) {
    let modal = this.modalCtrl.create('ParticularsModalPage', {
      name: str,
      getBonus: this.getGoodsInfo.bonus,
      sendto: this.getGoodsInfo.sale_city,
      GoodsInfo: this.getGoodsInfo.data,
      promotion: this.getGoodsInfo.promotion
    });
    modal.onDidDismiss(data => {
      console.log(data);
      if (data && data.region_name) {
        this.region_name = data.region_name;
        this.getHttpDetails();
      }
      if (data == 'goDredgeMoreCityPage') {
        this.navCtrl.push('DredgeMoreCityPage');
      }
    });
    modal.present();
  }
  /**
   * 除商品属性 弹窗
   */
  presentModalAttr() {
    this.http.getGoodsAttribute({ goods_id: this.goodsId }).then((res) => {
      console.log("商品初始属性", res);
      this.getGoodsAttribute = res;
      if (res.status == 1) {
        if (res.goods_type == 'goods_spectacles') {
          console.log("goods_type ☞'goods_spectacles'", res);
          if (typeof res.spectacles_properties.list == 'object') {
            let arr = new Array();
            for (let item in res.spectacles_properties.list) {
              arr.push(res.spectacles_properties.list[item]);
            }
            res.spectacles_properties.list = arr;
          }
          this.openAttrModal(res, 'goods_spectacles');
        }
        if (res.goods_type == 'goods') {
          // console.log("goods_type ☞'goods'", res);
          this.openAttrModal(res, 'goods');
        }
      }
    })
  }
  /**
   * 
   * @param res 商品属性列表
   * @param type 商品类型（镜片、镜架）
   */
  openAttrModal(res, type) {
    let modal = this.modalCtrl.create('ParticularsModalAttrPage', {
      data: res,
      type: type,
      headData: this.getGoodsInfo.data,
      id: this.goodsId
    });
    modal.onDidDismiss(data => {
      if (data) {
        if(data=='goCart'){
          this.navCtrl.push(data);
        }
      }
    });
    modal.present();
  }
  /*---商品关注----*/
  beCareFor() {
    if (this.getGoodsInfo.data.is_collect) {
      this.http.collectDel({ goods_id: this.goodsId }).then((res) => {
        console.log("取消商品关注", res);
        if (res.status) {
          this.getGoodsInfo.data.is_collect = 0;
          this.native.showToast('已取消关注')
        }
      });
    } else {
      this.http.getGoodsCollect({ goods_id: this.goodsId }).then((res) => {
        console.log("商品关注", res);
        if (res.status) {
          this.getGoodsInfo.data.is_collect = 1;
          this.native.showToast('关注成功')
        }
      });
    }
  }
  addToShoppingCart() {
    if (this.getGoodsAttribute.status == 1) {
      if (this.getGoodsAttribute.goods_type == 'goods') {
        this.http.getAttrList({ goods_id: this.goodsId }).then((res) => {
          console.log("goods_type ☞'goods'", res);
          this.http.addToCartSpec().then((res) => {
            console.log('普通商品加入购物车：', res)
            if (res.status == 1) {
              this.native.showToast('已经加入购物车');
              this.events.publish('car:updata');
            }
          })
        })
      }
      if (this.getGoodsAttribute.goods_type == 'goods_spectacles') {
        console.log("goods_type ☞'goods_spectacles'");
        this.http.addToCartSpecJp().then((res) => {
          console.log('镜片商品加入购物车：', res)
          if (res.status == 1) {
            this.native.showToast('已经加入购物车')
            this.events.publish('car:updata');
          }
        })
      }
    }
  }
  goParticularsPage(id) {
    this.navCtrl.push(ParticularsPage, { goodsId: id })
  }
  openCallNumber() {
    this.native.openCallNumber(this.getGoodsInfo.supplier_info.mobile, false);
  }
  goAccountServicePage() {
    this.native.showToast('敬请期待')
    // this.navCtrl.push(AccountServicePage)
  }
  goParticularsHome() {
    this.navCtrl.push('ParticularsHomePage', { suppliersId: this.getGoodsInfo.supplier_info.id });
  }
  goStore() {
    this.navCtrl.push('BrandListPage', { suppliersId: this.getGoodsInfo.supplier_info.id })
  }
  goCart() {
    this.navCtrl.push('CarPage');
  }
}
