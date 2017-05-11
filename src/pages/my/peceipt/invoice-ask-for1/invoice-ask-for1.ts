import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { InvoiceAskFor2Page } from "../invoice-ask-for2/invoice-ask-for2";
import { HttpService } from "../../../../providers/http-service";
import { Native } from "../../../../providers/native";

/*
  Generated class for the InvoiceAskFor1 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-invoice-ask-for1',
  templateUrl: 'invoice-ask-for1.html'
})
export class InvoiceAskFor1Page {
  orderIds: any = [];
  data: any;
  showSearch: boolean = true;

  InvoiceAskFor2Page = InvoiceAskFor2Page;
  suppliersId = this.navParams.get('suppliers_id');

  max_time;
  min_money: string;
  max_money: string;
  time: string;

  @ViewChild(Content) content: Content;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public native: Native
  ) {
    this.max_time = new Date().getFullYear();
    this.getHttpData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoiceAskFor1Page');
  }
  getHttpData() {
    this.httpService.addinv({ page: 1, suppliers_id: this.suppliersId }).then((res) => {
      if (res.status == 1) {
        this.data = res;
      }
    })
  }
  search() {
    this.httpService.addinv({
      suppliers_id: this.suppliersId,
      time: this.time,
      min_money: this.min_money,
      max_money: this.max_money
    }).then((res) => {
      if (res.status == 1) {
        this.data = res;
      }
    })
  }
  cancelDate() {
    this.time = '';
    this.search();
  }

  flag: boolean = true;
  doInfinite(infiniteScroll) {
    if (this.data.page < this.data.pages) {
      this.httpService.addinv({
        page: ++this.data.page,
        suppliers_id: this.suppliersId,
        time: this.time,
        min_money: this.min_money,
        max_money: this.max_money
      }).then((res) => {
        if (res.status == 1) {
          Array.prototype.push.apply(this.data.data, res.data);
        }
        setTimeout(() => {
          infiniteScroll.complete();
        }, 500);
      })
    } else {
      this.flag = false;
      return;
    }
  }
  scrollToTop() {
    this.content.scrollToTop();
  }

  checkOrder(item) {
    let index = this.orderIds.indexOf(item.order_id);
    if (index == -1) {
      this.orderIds.push(item.order_id);
    } else {
      this.orderIds.splice(index, 1);
    }
    console.log(this.orderIds)
  }
  onsubmit() {
    if (this.orderIds.length == 0) {
      this.native.showToast('请选择订单');
      return
    }
    this.httpService.selectzz({ order_ids: this.orderIds, suppliers_id: this.suppliersId }).then((res) => {
      console.log(res);
      if (res.status == 1) {
        this.navCtrl.push(InvoiceAskFor2Page, { data: res });
      }
    })
  }
}
