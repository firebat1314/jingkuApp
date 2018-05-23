import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RepaymentDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment:'BT/RepaymentDetailsPage',
  name:'BTRepaymentDetailsPage'
})
@Component({
  selector: 'page-repayment-details',
  templateUrl: 'repayment-details.html',
})
export class RepaymentDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepaymentDetailsPage');
  }

}
