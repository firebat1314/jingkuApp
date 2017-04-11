import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InvoiceAskFor2Page } from "../invoice-ask-for2/invoice-ask-for2";
import { HttpService } from "../../../../providers/http-service";

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpService) {
    this.getHttpData()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoiceAskFor1Page');
  }
  getHttpData() {
    this.httpService.addinv({ suppliers_id: this.suppliersId }).then((res) => {
      console.log(res);
      if (res.status == 1) {
        this.data = res;
      }
    })
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
  onsubmit(){
    this.httpService.selectzz({ order_ids: this.orderIds, suppliers_id: this.suppliersId }).then((res)=>{
      console.log(res);
      if(res.status==1){
        this.navCtrl.push(InvoiceAskFor2Page)
      }
    })
  }
}
