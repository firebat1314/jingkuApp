import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { HttpService } from "../../../../../providers/http-service";

/*
  Generated class for the OrderModalShipping page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-order-modal-shipping',
  templateUrl: 'order-modal-shipping.html'
})
export class OrderModalShippingPage {
  data = this.navParams.get('data');
  callBack = this.navParams.get('callBack')
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public httpService: HttpService,
    private events:Events
  ) {
    console.log(this.data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderModalShippingPage');
  }
  dismiss(data?: any) {
    // this.viewCtrl.dismiss(data);
    this.httpService.changeConsignee({ address_id: data.address_id }).then((res) => {
      console.log(res);
      if (res.status == 1) {
        this.callBack(data).then((res) => {
          this.navCtrl.pop();
          this.events.publish('writeOrder:refresh');
          console.log(res)
        }, (err) => {
          console.log(err)
        })
      }
    })

  }
}
