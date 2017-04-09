import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PaymentMethodPage } from "./payment-method/payment-method";
import { OrdersDetailPage } from "./orders-detail/orders-detail";
import { WriteOrdersPage } from "./write-orders/write-orders";
import { HttpService } from "../../../providers/http-service";
/*
  Generated class for the AllOrders page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-all-orders',
  templateUrl: 'all-orders.html'
})
export class AllOrdersPage {
    allOrderData: any;
  pageIndex: number = 0;

  @ViewChild('mytabs') mytabs;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService
  ) {
    this.getHttpData();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AllOrdersPage');
  }
  getHttpData() {
    this.httpService.order().then((res)=>{
      console.log(res);
      if(res.status==1){
        this.allOrderData = res;
      }
    })
  }
  ngAfterViewInit() {
    //进入页面默认选中栏目
    if (this.navParams.get('index')) {
      this.pageIndex = this.navParams.get('index');
      this.mytabs.selectedIndex = this.navParams.get('index');
    }
  }
  goOrdersDetailPage() {
    this.navCtrl.push(OrdersDetailPage);
  }
  goWriteOrdersPage() {
    this.navCtrl.push(WriteOrdersPage);
  }
}
