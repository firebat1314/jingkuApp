import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, Events, IonicPage, Content, FabButton } from 'ionic-angular';
/*http服务*/
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";

declare let qimoChatClick;
@IonicPage({
  name:'ParticularsPage',
  segment: 'particulars/:goodsId',
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-particulars',
  templateUrl: 'particulars.html'
})
export class ParticularsPage {
  /**
   * 用户选中的收货地址
   */
  region_name: any;
  /**
   * 为你推荐
   */
  getCategoryRecommendGoodsHot: any;
  /**
   * 商品总信息
   */
  getGoodsInfo: any;
  /**
   * 组合、推荐
   */
  selectGroupRecommend = "group" || 'recommend';
  /**
   * 详情、参数
   */
  selectPicArguments = "pic";//arguments
  /**
   * 商品id
   */
  goodsId: number = this.navParams.get('goodsId');/*3994 5676*/;
  /**
   * 购物车数量
   */
  badgeCount: number;
  /**
   * 图文详情
   */
  goods_desc: string = '';
  /**
   * 定制商品
   */
  is_dingzhi: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpService,
    public modalCtrl: ModalController,
    public native: Native,
    private events: Events
  ) {
    console.log("商品ID:", this.goodsId);
    this.events.subscribe('car:update', () => {
      this.getCarCount();
    })
  }
  ngOnInit() {
    this.getHttpDetails();
    this.getCarCount();
  }
  ngAfterViewInit() {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ParticularsPage');
  }
  /*   ionViewCanEnter() {
     if(this.firstViewInit){
       return true;
     }
     return this.getHttpDetails().then((res) => {
       this.firstViewInit = true;
       return true;
     }, (res) => {
       this.native.showToast(res);
       return false;
     }).catch((res) => {
       this.native.showToast('未知参数错误');
       return false;
     });
   }  */
  /**
   * 获取购物车数量
   */
  getCarCount() {
    this.http.getFlowGoods().then((res) => {
      this.badgeCount = res.goods_count;
    })
  }
  getHttpDetails() {
    return this.http.goodsInfos({ goods_id: this.goodsId }).then((res) => {
      // console.log("商品详情信息", res);
      if (res.status == 1) {
        this.getGoodsInfo = res;
        this.getRegionName(res);
        this.is_dingzhi = res.data.isdingzhi == 1 ? true : false;
      }
      this.http.getCategoryRecommendGoodsHot({}).then((res) => {
        // console.log('为你推荐：', res)
        if (res.status == 1) {
          this.getCategoryRecommendGoodsHot = res.data;
          /* 组合、推荐的默认标签 */
          if (res.data.length == 0) {
            this.selectGroupRecommend = "group";
          }
          /* 组合、推荐的默认标签 */
          if (this.getGoodsInfo.fittings.length == 0) {
            this.selectGroupRecommend = "recommend";
          }
        }
      })
    })
  }
  getRegionName(res) {
    for (var i = 0; i < res.sale_city.length; i++) {
      if (res.sale_city[i].selected == 1) {
        this.region_name = res.sale_city[i].region;
      }
    }
  }
  /*下拉刷新*/
  doRefresh(refresher) {
    this.getCarCount();
    this.getHttpDetails().then(() => {
      setTimeout(() => {
        refresher.complete();
      }, 500);
    });
  }
  doInfinite(infiniteScroll) {
    setTimeout(() => {
      infiniteScroll.enable(false);
      this.goods_desc = this.getGoodsInfo.data.goods_desc;
    }, 600);
  }
  presentModal(str) {
    let modal = this.modalCtrl.create('ParticularsModalPage', {
      name: str,
      getBonus: this.getGoodsInfo.bonus,
      sendto: this.getGoodsInfo.sale_city,
      GoodsInfo: this.getGoodsInfo.data,
      promotion: this.getGoodsInfo.promotion,
      goodsId: this.goodsId
    }, { cssClass: 'my-modal-style' });
    modal.onDidDismiss(data => {
      console.log(data);
      if (data && data.region) {
        this.region_name = data.region;
        this.getHttpDetails().then(() => {
          this.events.publish('home:update');
        });
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
      // console.log("商品初始属性", res);
      if (res.status == 1) {
        if (res.goods_type == 'goods_spectacles') {
          // console.log("goods_type ☞'goods_spectacles'", res);
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
    }, { cssClass: 'my-modal-style' });
    modal.onDidDismiss(data => {
      if (data) {
        if (data == 'CarPage') {
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
        // console.log("取消商品关注", res);
        if (res.status) {
          this.getGoodsInfo.data.is_collect = 0;
          // this.native.showToast('取消关注')
        }
      });
    } else {
      this.http.getGoodsCollect({ goods_id: this.goodsId }).then((res) => {
        // console.log("商品关注", res);
        if (res.status) {
          this.getGoodsInfo.data.is_collect = 1;
          // this.native.showToast('关注成功')
        }
      });
    }
  }
  /* addToShoppingCart() {
    if (this.getGoodsAttribute.status == 1) {
      if (this.getGoodsAttribute.goods_type == 'goods') {
        this.http.getAttrList({ goods_id: this.goodsId }).then((res) => {
          console.log("goods_type ☞'goods'", res);
          this.http.addToCartSpec().then((res) => {
            console.log('普通商品加入购物车：', res)
            if (res.status == 1) {
              this.native.showToast('已经加入购物车');
              this.events.publish('car:update');
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
            this.events.publish('car:update');
          }
        })
      }
    }
  } */
  goParticularsPage(id) {
    this.navCtrl.push(ParticularsPage, { goodsId: id })
  }
  openCallNumber() {
    this.native.openCallNumber(this.getGoodsInfo.supplier_info.mobile, false);
  }
  goAccountServicePage(access_id) {
    // this.native.showToast('敬请期待')
    console.log(access_id)
    this.native.showLoading();
    if (!access_id) {
      // this.native.showToast('该店铺暂无客服');
    }
    var old = document.getElementsByClassName('qimo')[0]
    //console.log(old);
    if (old) {
      old.parentNode.removeChild(old);
    }
    let qimo: HTMLScriptElement = document.createElement('script');
    qimo.type = 'text/javascript';
    qimo.src = 'https://webchat.7moor.com/javascripts/7moorInit.js?accessId=' + (access_id || 'b441f710-80d9-11e7-8ddd-b18e4f0e2471') + '&autoShow=false';
    console.log(qimo.src)
    qimo.className = 'qimo';
    document.getElementsByTagName('body')[0].appendChild(qimo);
    let that = this;
    qimo.onload = qimo['onreadystatechange'] = function () {
      that.native.hideLoading();
      if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
        setTimeout(function () {
          qimoChatClick();
        }, 600);
        qimo.onload = qimo['onreadystatechange'] = null;
      }
    };
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
