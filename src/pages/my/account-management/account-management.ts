import { Component } from '@angular/core';
import { NavController, NavParams, Events, IonicPage } from 'ionic-angular';
/*
  Generated class for the AccountManagement page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-account-management',
  templateUrl: 'account-management.html'
})
export class AccountManagementPage {
  AccountSecurityPage: any = 'AccountSecurityPage';
  AccountInfoPage: any = 'AccountInfoPage';
  ShippingAddressPage: any = 'ShippingAddressPage';
  MemberCenterPage: any = 'MemberCenterPage';
  
  avatar: any = this.navParams.get('avatar');
  username: any = this.navParams.get('username');
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events
  ) {
    this.events.subscribe('avatar:update', res => {
      this.avatar = res;
    })
  }
  ngOnDestroy() {
    this.events.unsubscribe('avatar:update');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountManagementPage');
  }

}
