import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
/*http服务*/
import { HttpService } from "../../../providers/http-service";

import { ParticularsModalPage } from "./particulars-modal/particulars-modal"
import { ParticularsModalMeitongPage } from "./particulars-modal-meitong/particulars-modal-meitong";
import { ParticularsModalHuliPage } from "./particulars-modal-huli/particulars-modal-huli";
import { ParticularsModalTaiyangPage } from "./particulars-modal-taiyang/particulars-modal-taiyang";
import { ParticularsModalJingpianPage } from "./particulars-modal-jingpian/particulars-modal-jingpian";
import { ParticularsModalJingjiaPage } from "./particulars-modal-jingjia/particulars-modal-jingjia";
/*
  Generated class for the Particulars page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-particulars',
  templateUrl: 'particulars.html'
})
export class ParticularsPage {
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

  selectGroupRecommend = "group";
  selectPicArguments = "pic";

  goodsId: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpService,
    public modalCtrl: ModalController
  ) {
    this.goodsId = this.navParams.get('goodsId') || '3994';
    console.log(this.goodsId)
  }
  presentModal(str) {
    let modal = this.modalCtrl.create(ParticularsModalPage, { name: str, getBonus: this.getBonus, sendto: this.getGoodsSaleCity });
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
  }
  presentModalAttr() {
    let modal;
    if (this.getGoodsAttribute.status == 1) {
      if (this.getGoodsAttribute.goods_type == 'goods_spectacles') {
        console.log("goods_type ☞'goods_spectacles'");
        modal = this.modalCtrl.create(ParticularsModalJingjiaPage, { data: this.getGoodsAttribute,type:'goods_spectacles',headData:this.getGoodsInfo });
        modal.onDidDismiss(data => {
          console.log(data);
        });
        modal.present();
      }
      if (this.getGoodsAttribute.goods_type == 'goods') {
        this.http.getAttrList({ goods_id: this.goodsId }).then((res) => {
          console.log("goods_type ☞'goods'", res);
          modal = this.modalCtrl.create(ParticularsModalJingjiaPage, { data: res,type:'goods',headData:this.getGoodsInfo });
          modal.onDidDismiss(data => {
            console.log(data);
          });
          modal.present();
        });
      }
    }
  }
  presentModalJingpian() {
    let modal = this.modalCtrl.create(ParticularsModalJingpianPage, {});
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
  }
  presentModalJingjia() {
    let modal = this.modalCtrl.create(ParticularsModalJingjiaPage, {});
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
  }
  presentModalMeitong() {
    let modal = this.modalCtrl.create(ParticularsModalMeitongPage, {});
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
  }
  presentModalHuli() {
    let modal = this.modalCtrl.create(ParticularsModalHuliPage, {});
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
  }
  presentModalTaiyang() {
    let modal = this.modalCtrl.create(ParticularsModalTaiyangPage, {});
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
  }

  ngOnInit() {
    this.http.getGoodsGallery({ goods_id: this.goodsId }).then((res) => {
      console.log("商品详情的相册图片轮播", res);
      this.getGoodsGallery = res.data;
    });
    this.http.getPriceSection({ goods_id: this.goodsId }).then((res) => {
      console.log("获取商品价格优惠区间", res);
      this.getPriceSection = res;
    });
    this.http.getGoodsInfo({ goods_id: this.goodsId }).then((res) => {
      console.log("商品详情信息", res);
      this.getGoodsInfo = res.data;
    });
    this.http.getGoodsParameter({ goods_id: this.goodsId }).then((res) => {
      console.log("获取商品参数", res);
      this.getGoodsParameter = res.data;
    });
    this.http.getGoodsSaleCity({ goods_id: this.goodsId }).then((res) => {
      console.log("获取商品的销售区域", res);
      this.getGoodsSaleCity = res.data;
    });
    this.http.getSupplierInfo({ goods_id: this.goodsId }).then((res) => {
      console.log("获取供应商信息", res);
      this.getSupplierInfo = res.data;
    });
    this.http.getBonus({ goods_id: this.goodsId }).then((res) => {
      console.log("优惠券列表", res);
      this.getBonus = res.data;
    });
    this.http.getGoodsFittings({ goods_id: this.goodsId }).then((res) => {
      console.log("组合商品", res);
      this.getGoodsFittings = res.data;
    });
    this.http.getLinkedGoods({ goods_id: this.goodsId }).then((res) => {
      console.log("关联商品", res);
      this.getLinkedGoods = res.data;
    });
    this.http.searchGoods({ goods_id: this.goodsId }).then((res) => {
      console.log("商品搜索列表页", res);
      this.searchGoods = res.data;
    });
    this.http.getGoodsAttribute({ goods_id: this.goodsId }).then((res) => {
      console.log("商品初始属性", res);
      this.getGoodsAttribute = res;
      // console.log(JSON.stringify(res.data))
    });

  }
  /*---关注----*/
  beCareFor() {
    if (this.getGoodsInfo.is_collect) {
      this.http.collectDel({ goods_id: 3994 }).then((res) => {
        console.log("取消商品关注", res);
        if (res.status) {
          this.getGoodsInfo.is_collect = 0;
        }
      });
    } else {
      this.http.getGoodsCollect({ goods_id: 3994 }).then((res) => {
        console.log("商品关注", res);
        if (res.status) {
          this.getGoodsInfo.is_collect = 1;
        }
      });
    }
  }
  ngAfterViewInit() {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ParticularsPage');
  }

}
