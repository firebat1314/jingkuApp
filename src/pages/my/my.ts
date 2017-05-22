import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, Events } from 'ionic-angular';
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
import { DredgeMoreCityPage } from "../home/particulars/dredge-more-city/dredge-more-city";
import { MessagePage } from "../home/message/message";
import { Native } from "../../providers/native";


@Component({
  selector: 'page-my',
  templateUrl: 'my.html'
})
export class MyPage {
  SettingPage: any = SettingPage;
  PeceiptPage: any = PeceiptPage;
  AllOrdersPage: any = AllOrdersPage;
  AccountAssetPage: any = AccountAssetPage;
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
  DredgeMoreCityPage: any = DredgeMoreCityPage;

  usercount: any;
  userInfo: any;
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public httpService: HttpService,
    public events: Events,
    public native: Native
  ) {
    this.httpResult()
    this.events.subscribe('avatar:update', () => {
      this.httpResult()
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPages');
  }
  httpResult(finish?) {
    this.httpService.usercount().then((res) => {
      if (res.status == 1) {
        this.usercount = res;
      }
      this.httpService.userInfo().then((res) => {
        if (res.status == 1) {
          this.userInfo = res;
          this.httpService.setStorage('phonenumber', res.data.user_info.mobile_phone);
        }
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
  goMessagePage() {
    this.navCtrl.push(MessagePage)
  }

  goAccountProcessPage() {
    this.native.showToast('敬请期待')
    // this.navCtrl.push(AccountProcessPage)
  }
  goAccountServicePage() {
    this.native.openAlertBox('拨打客服电话：400-080-5118', () => {
      this.native.openCallNumber('400-080-5118', false);
    })
  }
}
