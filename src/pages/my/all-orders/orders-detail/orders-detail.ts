import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";
import { ParticularsPage } from "../../../home/particulars/particulars";

/*
  Generated class for the OrdersDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-orders-detail',
  templateUrl: 'orders-detail.html'
})
export class OrdersDetailPage {
  data: any;
  orderId: any = this.navParams.get('order_id');

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpService) {
    this.getOrderInfo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersDetailPage');
  }
  clickAftermarket(evt) {
    evt.stopPropagation();
  }
  getOrderInfo() {
    this.httpService.orderInfo({ order_id: this.orderId }).then((res) => {
      console.log(res);
      if (res.status == 1) {
        this.data = res;
      }
    })
  }
  goParticularsPage(id){
    this.navCtrl.push(ParticularsPage,{goodsId:id});
  }
}
