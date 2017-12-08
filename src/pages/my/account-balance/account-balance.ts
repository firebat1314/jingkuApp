import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";

/*
  Generated class for the AccountBalance page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-account-balance',
  templateUrl: 'account-balance.html'
})
export class AccountBalancePage {
  userInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpService) {
  }

  ngOnInit(){
    this.getData();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountBalancePage');
  }

  getData() {
    this.httpService.userInfo().then((res) => {
      if (res.status == 1) { this.userInfo = res; }
    })
  }
  goAllOrdersPage(){
    this.navCtrl.push('AllOrdersPage');
  }
  goRechargePage() {
    this.navCtrl.push('RechargePage');
  }
  goAccountWithdrawPage() {
    this.navCtrl.push('AccountWithdrawPage');
  }
  goAccountMoneyDetailPage() {
    this.navCtrl.push('AccountMoneyDetailPage');
  }
}
