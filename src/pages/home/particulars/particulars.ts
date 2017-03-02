import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
/*http服务*/
import { HttpService } from "../../../providers/http-service";

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
  endDate = '1488530474470';

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpService) {
    this.http.getGoodsGallery({goods_id:4994}).then((res) => {
      console.log("商品详情的相册图片轮播",res);
    });
    this.http.getPriceSection({goods_id:4994}).then((res) => {
      console.log("获取商品价格优惠区间",res);
    });
    this.http.getGoodsInfo({goods_id:4994}).then((res) => {
      console.log("商品详情信息",res);
    });
    this.http.getGoodsParameter({goods_id:4994}).then((res) => {
      console.log("获取商品参数",res);
    });
    this.http.getGoodsSaleCity({goods_id:4994}).then((res) => {
      console.log("获取商品的销售区域",res);
    });
    this.http.getSupplierInfo({goods_id:4994}).then((res) => {
      console.log("获取供应商信息",res);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParticularsPage');
  }

}
