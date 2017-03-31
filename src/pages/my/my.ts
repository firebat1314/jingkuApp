import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { HttpService } from "../../providers/http-service";

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
  SettingPage: any = SettingPage;
  PeceiptPage: any = PeceiptPage;
  AllOrdersPage: any = AllOrdersPage;
  AccountAssetPage: any = AccountAssetPage;
  AccountProcessPage: any = AccountProcessPage;
  AccountAreaApplicationPage: any = AccountAreaApplicationPage;
  AccountCollectGoodsPage: any = AccountCollectGoodsPage;
  AccountCollectStorePage: any = AccountCollectStorePage;
  AccountHistoryPage: any = AccountHistoryPage;
  AccountServicePage: any = AccountServicePage;
  AccountHelperPage: any = AccountHelperPage;
  AccountManagementPage: any = AccountManagementPage;
  CouponPage: any = CouponPage;
  AccountJifenPage: any = AccountJifenPage;
  AccountBalancePage: any = AccountBalancePage;

  usercount: any;
  userInfo: any;
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public httpService: HttpService
  ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPages');
  }
  ngOnInit() {
    this.httpResult()
  }
  httpResult(finish?) {
    this.httpService.usercount().then((res) => {
      console.log('（1）个人中心获取用户统计☞', res)
      if (res.status == 1) { this.usercount = res; }
      this.httpService.userInfo().then((res) => {
        console.log('（2）获取用户资料☞', res)
        if (res.status == 1) { this.userInfo = res; }
        if (finish) { finish(); }
      })
    })
  }
  /*下拉刷新*/
  doRefresh(refresher) {
    this.httpResult(() => {
      setTimeout(() => {
        refresher.complete();
      }, 500);
    })
  }
  goSettingPage() {
    this.navCtrl.push(SettingPage)
  }
}
