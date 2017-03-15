import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChangePhoneNumberPage } from "./change-phone-number/change-phone-number";
import { ChangePasswordPage } from "./change-password/change-password";

/*
  Generated class for the AccountSecurity page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-account-security',
  templateUrl: 'account-security.html'
})
export class AccountSecurityPage {
  ChangePhoneNumberPage:any = ChangePhoneNumberPage;
  ChangePasswordPage:any = ChangePasswordPage

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountSecurityPage');
  }

}
