import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Events, Content } from 'ionic-angular';

import { InvoiceQualificationPage } from "./invoice-qualification/invoice-qualification";
import { InvoiceAskFor2Page } from "./invoice-ask-for2/invoice-ask-for2";
import { InvoiceAskFor1Page } from "./invoice-ask-for1/invoice-ask-for1";
import { HttpService } from "../../../providers/http-service";

/*
  Generated class for the Peceipt page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-peceipt',
  templateUrl: 'peceipt.html'
})
export class PeceiptPage {
  invRoleList: any;
  suoquList: any;
  invoiceList: any;
  receiptTool: any = 'receiptSskFor';//or receiptSskFor or receiptList or receiptInfo
  myDate: any;
  nowTime = new Date().getFullYear();
  // maxTime:any = '2017-3-17';
  @ViewChild(Content) content: Content
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public events: Events
  ) {
    this.getHttpData();
    this.events.subscribe('peceipt:update', () => {
      this.getHttpData();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeceiptPage');
  }
  getHttpData() {
    this.httpService.invoice({ page: 1 }).then((res) => {
      console.log(res);
      this.suoquList = res;
    })
    this.httpService.invList({ page: 1 }).then((res) => {
      console.log(res);
      this.invoiceList = res;
    })
    this.httpService.invRole({ page: 1 }).then((res) => {
      console.log(res);
      this.invRoleList = res;
    })
  }
  search() {
    this.httpService.invList().then((res) => {
      console.log(res);
      this.invoiceList = res;
    })
  }
  flag: boolean = true;
  doInfinite(infiniteScroll) {
    if (this.receiptTool == 'receiptSskFor') {
      if (this.suoquList.page < this.suoquList.pages) {
        this.httpService.invoice({ page: ++this.suoquList.page }).then((res) => {
          if (res.status == 1) {
            Array.prototype.push.apply(this.suoquList.data, res.data);
          }
          setTimeout(() => {
            infiniteScroll.complete();
          }, 500);
        })
      } else {
        setTimeout(() => {
          infiniteScroll.complete();
        }, 500);
      }
    } else if (this.receiptTool == 'receiptList') {
      if (this.invoiceList.page < this.invoiceList.pages) {
        this.httpService.invoice({ page: ++this.invoiceList.page }).then((res) => {
          if (res.status == 1) {
            Array.prototype.push.apply(this.invoiceList.data, res.data);
          }
          setTimeout(() => {
            infiniteScroll.complete();
          }, 500);
        })
      } else {
        setTimeout(() => {
          infiniteScroll.complete();
        }, 500);
      }
    } else if (this.receiptTool == 'receiptInfo') {
      if (this.invRoleList.page < this.invRoleList.pages) {
        this.httpService.invoice({ page: ++this.invRoleList.page }).then((res) => {
          if (res.status == 1) {
            Array.prototype.push.apply(this.invRoleList.data, res.data);
          }
          setTimeout(() => {
            infiniteScroll.complete();
          }, 500);
        })
      } else {
        setTimeout(() => {
          infiniteScroll.complete();
        }, 500);
      }
    }

  }
  scrollToTop() {
    this.content.scrollToTop();
  }
  goInvoiceQualificationPage(ivid) {
    this.navCtrl.push(InvoiceQualificationPage, { ivid: ivid })
  }
  goInvoiceAskFor2Page() {
    this.navCtrl.push(InvoiceAskFor2Page)
  }
  goInvoiceAskFor1Page(id) {
    this.navCtrl.push(InvoiceAskFor1Page, { suppliers_id: id })
  }
}
