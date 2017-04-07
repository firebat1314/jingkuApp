import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    console.log(this.data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderModalShippingPage');
  }
  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }
}
