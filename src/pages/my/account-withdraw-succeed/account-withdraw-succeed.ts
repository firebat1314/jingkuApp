import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AccountBalancePage } from "../account-balance/account-balance";

/*
  Generated class for the AccountWithdrawSucceed page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-account-withdraw-succeed',
  templateUrl: 'account-withdraw-succeed.html'
})
export class AccountWithdrawSucceedPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.time();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountWithdrawSucceedPage');
  }
  private wait: number = 3;
  timeout = null;
  private time() {
    if (this.wait == 0) {
      this.goAccountBalancePage()
      this.wait = 3;
      return
    } else {
      let self = this;
      this.timeout = setTimeout(function () {
        self.wait--;
        self.time();
      }, 1000)
    }
  }
  goAccountBalancePage() {
    this.navCtrl.popTo(this.navCtrl.getByIndex(1))
  }
  ngOnDestroy() {
    clearTimeout(this.timeout);//删除定时器
  }
}
