import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Events, Content, IonicPage, FabButton } from 'ionic-angular';

import { HttpService } from "../../../providers/http-service";

/*
  Generated class for the Peceipt page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
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
  @ViewChild(FabButton) fabButton: FabButton
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

  ngAfterViewInit() {
    /* 回到顶部按钮 */
    this.fabButton.setElementClass('fab-button-out',true);
    this.content.ionScroll.subscribe((d) => {
      this.fabButton.setElementClass("fab-button-in", d.scrollTop >= d.contentHeight);
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PeceiptPage');
  }
  getHttpData() {
    this.httpService.invoice({ page: 1 }).then((res) => {
      if (res.status == 1) {
        this.suoquList = res;
      }
    })
    this.httpService.invList({ page: 1 }).then((res) => {
      if (res.status == 1) {
        this.invoiceList = res;
      }
    })
    this.httpService.invRole({ page: 1 }).then((res) => {
      if (res.status == 1) {
        this.invRoleList = res;
      }
    })
  }

  search() {
    this.httpService.invList({ page: 1, time: this.myDate }).then((res) => {
      if (res.status == 1) {
        this.invoiceList = res;
      }
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
        this.flag = false;
      }
    } else if (this.receiptTool == 'receiptList') {
      if (this.invoiceList.page < this.invoiceList.pages) {
        this.httpService.invList({ page: ++this.invoiceList.page }).then((res) => {
          if (res.status == 1) {
            Array.prototype.push.apply(this.invoiceList.data, res.data);
          }
          setTimeout(() => {
            infiniteScroll.complete();
          }, 500);
        })
      } else {
        this.flag = false;
      }
    } else if (this.receiptTool == 'receiptInfo') {
      if (this.invRoleList.page < this.invRoleList.pages) {
        this.httpService.invRole({ page: ++this.invRoleList.page }).then((res) => {
          if (res.status == 1) {
            Array.prototype.push.apply(this.invRoleList.data, res.data);
          }
          setTimeout(() => {
            infiniteScroll.complete();
          }, 500);
        })
      } else {
        this.flag = false;
      }
    }
  }
  goInvoiceQualificationPage(ivid) {
    this.navCtrl.push('InvoiceQualificationPage', { ivid: ivid })
  }
  goInvoiceAskFor2Page() {
    this.navCtrl.push('InvoiceAskFor2Page')
  }
  goInvoiceAskFor1Page(id) {
    this.navCtrl.push('InvoiceAskFor1Page', { suppliers_id: id })
  }
}
