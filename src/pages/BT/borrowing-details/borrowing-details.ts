import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BorrowingDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment:'BT/BorrowingDetailsPage',
  name:'BTBorrowingDetailsPage'
})
@Component({
  selector: 'page-borrowing-details',
  templateUrl: 'borrowing-details.html',
})
export class BorrowingDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BorrowingDetailsPage');
  }

}
