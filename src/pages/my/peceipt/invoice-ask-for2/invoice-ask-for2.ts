import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";
import { Native } from "../../../../providers/native";

/*
  Generated class for the InvoiceAskFor2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-invoice-ask-for2',
  templateUrl: 'invoice-ask-for2.html'
})
export class InvoiceAskFor2Page {
  data: any = this.navParams.get('data');
  formData = {
    address_id: '',
    ivid: '',
    order_ids: this.data.order_ids,
    suppliers_id: this.data.suppliers_id
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpService,
    private native:Native
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoiceAskFor2Page');
  }
  onsubmit() {
    console.log(this.formData)
    this.httpService.insertInv(this.formData).then((res) => {
      console.log(res)
      if(res.status==1){
        this.native.showToast('操作成功')
      }
    })
  }
}
