import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InvoiceAskFor2Page } from "../invoice-ask-for2/invoice-ask-for2";

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
  showSearch:boolean = true;

  InvoiceAskFor2Page = InvoiceAskFor2Page;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoiceAskFor1Page');
  }
  goInvoiceAskFor2Page(){
    this.navCtrl.push(InvoiceAskFor2Page)
  }
}
