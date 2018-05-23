import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BorrowingRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment:'BT/BorrowingRecordPage',
  name:'BTBorrowingRecordPage'
})
@Component({
  selector: 'page-borrowing-record',
  templateUrl: 'borrowing-record.html',
})
export class BorrowingRecordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BorrowingRecordPage');
  }

}
