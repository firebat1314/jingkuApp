import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the PaymentMethod page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-payment-method',
  templateUrl: 'payment-method.html'
})
export class PaymentMethodPage {
  data = this.navParams.get('data');

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentMethodPage');
  }
  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }
}
