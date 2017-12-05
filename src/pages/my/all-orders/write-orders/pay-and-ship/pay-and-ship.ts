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
  selectPayment(item, items) {
    this.httpService.selectPayment({ pay_id: item.pay_id }).then((res) => {
      if (res.status == 1) {
        for (let i = 0; i < items.length; i++) {
          const element = items[i].selected = false;
        }
        item.selected = true;
        this.events.publish('writeOrder:refresh');
        /* this.getData().then(() => {
        this.events.publish('writeOrder:refresh');
      }); */
      }
    })
  }
  selectShippinSuppliers(suppliers_id, item, items) {
    this.httpService.selectShippinSuppliers({ suppliers_id: suppliers_id, shipping: item.shipping_id }).then((res) => {
      if (res.status == 1) {
        for (let i = 0; i < items.length; i++) {
          const element = items[i].selected = false;
        }
        item.selected = true;
        this.events.publish('writeOrder:refresh');
        /*  this.getData().then(() => {
        this.events.publish('writeOrder:refresh');
      }); */
      }
    })
  }

}
