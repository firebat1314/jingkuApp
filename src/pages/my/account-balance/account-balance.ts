import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RechargePage } from "../../home/recharge/recharge";
import { AccountWithdrawPage } from "../account-withdraw/account-withdraw";
import { AccountMoneyDetailPage } from "../account-money-detail/account-money-detail";

/*
  Generated class for the AccountBalance page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-account-balance',
  templateUrl: 'account-balance.html'
})
export class AccountBalancePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountBalancePage');
  }
  goRechargePage(){
    this.navCtrl.push(RechargePage);
  }
  goAccountWithdrawPage(){
    this.navCtrl.push(AccountWithdrawPage);
  }
  goAccountMoneyDetailPage(){
    this.navCtrl.push(AccountMoneyDetailPage);
  }
}
