import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, Events } from 'ionic-angular';
import { HttpService } from "../../../../../providers/http-service";

/**
 * Generated class for the PayAndShipPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay-and-ship',
  templateUrl: 'pay-and-ship.html',
})
export class PayAndShipPage {
  data: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public events: Events,
  ) {
    this.getData();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PayAndShipPage');
  }
  getData() {
    return this.httpService.checkout().then((res) => {
      this.data = res;
    })
  }
  selectPayment(pay_id) {
    this.httpService.selectPayment({ pay_id: pay_id }).then((res) => {
      if (res.status == 1) {
        this.getData().then(() => {
          this.events.publish('writeOrder:refresh');
        });
      }
    })
  }
  selectShippinSuppliers(suppliers_id, shipping_id) {
    this.httpService.selectShippinSuppliers({ suppliers_id: suppliers_id, shipping: shipping_id }).then((res) => {
      if (res.status == 1) {
        this.getData().then(() => {
          this.events.publish('writeOrder:refresh');
        });
      }
    })
  }

}
