import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AccountWithdrawSucceedPage } from "../account-withdraw-succeed/account-withdraw-succeed";

/*
  Generated class for the AccountWithdraw page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-account-withdraw',
  templateUrl: 'account-withdraw.html'
})
export class AccountWithdrawPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountWithdrawPage');
  }
  submit(){
    this.goAccountWithdrawSucceedPage();
  }
  goAccountWithdrawSucceedPage(){
    this.navCtrl.push(AccountWithdrawSucceedPage);
  }
}
