import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";
import { Native } from "../../../../providers/native";
import { WriteOrdersPage } from "../../../my/all-orders/write-orders/write-orders";

/*
  Generated class for the DuihuanDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-duihuan-details',
  templateUrl: 'duihuan-details.html'
})
export class DuihuanDetailsPage {
  getGoodsParameter: any;
  getGoodsInfo: any;
  getGoodsGallery: any;
  selectPicArguments = 'pic';

  goodsId: number = this.navParams.get('goodsId');
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public native: Native
  ) {
    this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DuihuanDetailsPage');
  }

  getData() {
    this.httpService.getGoodsGallery({ goods_id: this.goodsId }).then((res) => {
      if (res.status == 1) {
        this.getGoodsGallery = res.data;
      }
      this.httpService.getGoodsInfo({ goods_id: this.goodsId }).then((res) => {
        if (res.status == 1) {
          this.getGoodsInfo = res.data;
        }
        this.httpService.getGoodsParameter({ goods_id: this.goodsId }).then((res) => {
          if (res.status == 1) {
            this.getGoodsParameter = res.data;
          }
        })
      })
    })
  }

  doConvertibility() {
    this.native.openAlertBox('是否兑换该商品？', () => {
      this.httpService.exchangebuy({ goods_id: this.goodsId }).then((res) => {
        if (res.status == 1) {
          this.native.showToast(res.data);
          this.navCtrl.push(WriteOrdersPage,{type:'integral'})
        }
      })
    })
  }
}
