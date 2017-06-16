import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AccountWithdrawSucceedPage } from "../account-withdraw-succeed/account-withdraw-succeed";
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";

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

  formData = {
    note: '',
    bank: '',
    bank_number: '',
    account_holder: '',
    amount: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public native: Native
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountWithdrawPage');
  }

  submit() {
    this.native.showLoading();
    this.httpService.withdrawals(this.formData).then((res) => {
      this.native.hideLoading();
      this.native.showToast(res.data);
      if (res.status == 1) {
        this.navCtrl.push(AccountWithdrawSucceedPage);
      }
    })
  }
}
