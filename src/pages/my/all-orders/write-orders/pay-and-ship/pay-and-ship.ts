import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, Events } from 'ionic-angular';
import { HttpService } from "../../../../../providers/http-service";

/**
 * Generated class for the PayAndShipPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  segment:'pay-and-ship/:dId'
})
@Component({
  selector: 'page-pay-and-ship',
  templateUrl: 'pay-and-ship.html',
})
export class PayAndShipPage {
  data: any;
  dId: any = this.navParams.get('dId');

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
    if (this.dId > 0) {
      return this.httpService.checkout_d({ id: this.dId }).then((res) => {
        this.data = res;
      })
    } else {
      return this.httpService.checkout().then((res) => {
        this.data = res;
      })
    }
  }
  selectPayment(payment, list) {
    if (this.dId > 0) {
      this.httpService.select_payment_d({ pay_id: payment.pay_id, id: this.dId }).then((res) => {
        if (res.status == 1) {
          this.events.publish('writeOrder:refresh');
          list.forEach(term => {
            term.selected = 0;
          });
          payment.selected = 1;
        }
      })
    } else {
      this.httpService.selectPayment({ pay_id: payment.pay_id }).then((res) => {
        if (res.status == 1) {
          this.events.publish('writeOrder:refresh');
          list.forEach(term => {
            term.selected = 0;
          });
          payment.selected = 1;
        }
      })
    }
  }
  selectShippinSuppliers(ship, list, suppliers_id) {
    this.httpService.selectShippinSuppliers({ suppliers_id: suppliers_id, shipping: ship.shipping_id }).then((res) => {
      if (res.status == 1) {
        this.events.publish('writeOrder:refresh');
        list.forEach(term => {
          term.selected = 0;
        });
        ship.selected = 1;
      }
    })
  }

  onsubmit() {
    this.events.publish('writeOrder:refresh'); this.navCtrl.pop().catch(res => { history.back() });
  }
}
