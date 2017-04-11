import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
  // maxTime:any = '2017-3-17';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService
  ) {
    this.getHttpData()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeceiptPage');
  }
  getHttpData() {
    this.httpService.invoice().then((res) => {
      console.log(res);
      this.suoquList = res;
    })
    this.httpService.invList().then((res) => {
      console.log(res);
      this.invoiceList = res;
    })
    this.httpService.invRole().then((res) => {
      console.log(res);
      this.invRoleList = res;
    })
  }
  goInvoiceQualificationPage() {
    this.navCtrl.push(InvoiceQualificationPage)
  }
  goInvoiceAskFor2Page() {
    this.navCtrl.push(InvoiceAskFor2Page)
  }
  goInvoiceAskFor1Page(id) {
    this.navCtrl.push(InvoiceAskFor1Page,{suppliers_id:id})
  }
}
