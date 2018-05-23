import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RepaymentHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment:'BT/RepaymentHistoryPage',
  name:'BTRepaymentHistoryPage'
})
@Component({
  selector: 'page-repayment-history',
  templateUrl: 'repayment-history.html',
})
export class RepaymentHistoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepaymentHistoryPage');
  }

}
