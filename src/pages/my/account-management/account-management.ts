import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AccountSecurityPage } from "./account-security/account-security";
import { AccountInfoPage } from "./account-info/account-info";
import { ShippingAddressPage } from "./shipping-address/shipping-address";
import { MemberCenterPage } from "./member-center/member-center";

/*
  Generated class for the AccountManagement page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-account-management',
  templateUrl: 'account-management.html'
})
export class AccountManagementPage {
  AccountSecurityPage:any = AccountSecurityPage;
  AccountInfoPage:any = AccountInfoPage;
  ShippingAddressPage:any = ShippingAddressPage;
  MemberCenterPage:any = MemberCenterPage;

  avatar:any = this.navParams.get('avatar');
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountManagementPage');
  }

}
