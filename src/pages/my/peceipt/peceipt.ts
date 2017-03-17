import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { InvoiceQualificationPage } from "./invoice-qualification/invoice-qualification";
import { InvoiceAskFor2Page } from "./invoice-ask-for2/invoice-ask-for2";
import { InvoiceAskFor1Page } from "./invoice-ask-for1/invoice-ask-for1";

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
  receiptTool:any = 'receiptInfo';
  myDate:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}


  ionViewDidLoad() {
    console.log('ionViewDidLoad PeceiptPage');
  }

  goInvoiceQualificationPage(){
    this.navCtrl.push(InvoiceQualificationPage)
  }
  goInvoiceAskFor2Page(){
    this.navCtrl.push(InvoiceAskFor2Page)
  }
  goInvoiceAskFor1Page(){
    this.navCtrl.push(InvoiceAskFor1Page)
  }
}
