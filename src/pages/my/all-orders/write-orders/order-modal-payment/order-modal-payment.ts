import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, IonicPage } from 'ionic-angular';

/*
  Generated class for the OrderModalPayment page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-order-modal-payment',
  templateUrl: 'order-modal-payment.html'
})
export class OrderModalPaymentPage {
  data = this.navParams.get('data');

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderModalPaymentPage');
  }
  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }
}
