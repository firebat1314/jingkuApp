import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, IonicPage } from 'ionic-angular';

/*
  Generated class for the OrderModalDistribution page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-order-modal-distribution',
  templateUrl: 'order-modal-distribution.html'
})
export class OrderModalDistributionPage {
  data = this.navParams.get('data');
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    // console.log(this.data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderModalDistributionPage');
  }
  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }
}
