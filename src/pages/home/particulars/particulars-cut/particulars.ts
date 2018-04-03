import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, Events, IonicPage, Content, FabButton } from 'ionic-angular';
/*http服务*/
import { HttpService } from "../../../../providers/http-service";
import { Native } from "../../../../providers/native";
import { WxServiceProvider } from '../../../../providers/wx-service/wx-service';
import { QimoChatProvider } from '../../../../providers/qimo-chat/qimo-chat';
declare let wx;
@IonicPage({
  name: 'ParticularsCutPage',
  segment: 'particulars-cut/:goodsId',
  defaultHistory: ['classify']
})
@Component({
  selector: 'page-particulars-cut',
  templateUrl: 'particulars.html'
})
export class ParticularsCutPage {
  region_name: any;//用户选中的收货地址
  getCategoryRecommendGoodsHot: any;//为你推荐
  getGoodsInfo: any;//商品总信息
  selectGroupRecommend = "group" || 'recommend';//组合、推荐
  selectPicArguments = "pic";//arguments//详情、参数
  goodsId: number = this.navParams.get('goodsId');//3994 5676//商品id
  badgeCount: number;//购物车数量
  goods_desc: string = '';//图文详情
  is_dingzhi: boolean = false;//定制商品

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpService,
    public modalCtrl: ModalController,
    public native: Native,
    private events: Events,
    private wxService: WxServiceProvider,
    private QimoChat: QimoChatProvider,
  ) {
    
  }
  ngOnInit() {
    console.log("商品ID:", this.goodsId);
    this.events.subscribe('car:update', () => {
      this.getCarCount();
    })
    this.getHttpDetails();
    this.getCarCount();
  }
  ngAfterViewInit() {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ParticularsPage');
  }
  /**
   * 获取购物车数量
   */
  getCarCount() {
    this.http.get_flow_goods_number().then((res) => {
      this.badgeCount = res.data;
    })
  }
  getHttpDetails() {

    return this.http.goodsInfos({ goods_id: this.goodsId }).then((res) => {
      // console.log("商品详情信息", res);
      if (res.status == 1) {

        if (this.native.isWeixin()) {
          console.log('详情页', location.href)
          this.wxService.config(location.href, {
            title: '镜库科技', // 分享标题
            desc: res.data.goods_name, // 分享描述
            link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: res.data.goods_thumb, // 分享图标
          })
        }

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
        }else if(data == 'AccountInfoPage'){
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
  goParticularsPage(id) {
    this.navCtrl.push('ParticularsPage', { goodsId: id })
  }
  openCallNumber() {
    this.native.openCallNumber(this.getGoodsInfo.supplier_info.mobile, false);
  }
  goAccountServicePage() {
    this.QimoChat.qimoChatSDK(this.getGoodsInfo.supplier_info.access_id,this.getGoodsInfo.supplier_info.name,this.getGoodsInfo.supplier_info.logo,);
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
