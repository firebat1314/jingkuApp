import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { SettingPage } from "./setting/setting";
import { AllOrdersPage } from "./all-orders/all-orders";
import { AccountAssetPage } from "./account-asset/account-asset";
import { AccountProcessPage } from "./account-process/account-process";
import { PeceiptPage } from "./peceipt/peceipt";
import { AccountAreaApplicationPage } from "./account-area-application/account-area-application";
import { AccountCollectGoodsPage } from "./account-collect-goods/account-collect-goods";
import { AccountCollectStorePage } from "./account-collect-store/account-collect-store";
import { AccountHistoryPage } from "./account-history/account-history";
import { AccountServicePage } from "./account-service/account-service";
import { AccountHelperPage } from "./account-helper/account-helper";
import { AccountManagementPage } from "./account-management/account-management";
import { CouponPage } from "./coupon/coupon";
import { AccountJifenPage } from "./account-jifen/account-jifen";
import { AccountBalancePage } from "./account-balance/account-balance";

@Component({
  selector: 'page-my',
  templateUrl: 'my.html'
})
export class MyPage {
  SettingPage = SettingPage;
  PeceiptPage = PeceiptPage;
  AllOrdersPage = AllOrdersPage;
  AccountAssetPage = AccountAssetPage;
  AccountProcessPage = AccountProcessPage;
  AccountAreaApplicationPage = AccountAreaApplicationPage;
  AccountCollectGoodsPage = AccountCollectGoodsPage;
  AccountCollectStorePage = AccountCollectStorePage;
  AccountHistoryPage = AccountHistoryPage;
  AccountServicePage = AccountServicePage;
  AccountHelperPage = AccountHelperPage;
  AccountManagementPage = AccountManagementPage;
  CouponPage = CouponPage;
  AccountJifenPage = AccountJifenPage;
  AccountBalancePage = AccountBalancePage;
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPages');
  }


  goSettingPage() {
    this.navCtrl.push(SettingPage)
  }
}
