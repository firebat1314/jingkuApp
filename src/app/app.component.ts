import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, ToastController, Nav, IonicApp, Events, Keyboard } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { JpushService } from "../providers/jpush-service";

/*import { ParticularsPage } from '../pages/home/particulars/particulars'
import { DredgeMoreCityPage } from '../pages/home/particulars/dredge-more-city/dredge-more-city'
import { PeceiptPage } from "../pages/my/peceipt/peceipt";
import { SettingPage } from "../pages/my/setting/setting";
import { AccountManagementPage } from "../pages/my/account-management/account-management";
import { BrandListPage } from "../pages/home/brand-list/brand-list";
import { InvoiceQualificationPage } from "../pages/my/peceipt/invoice-qualification/invoice-qualification";
import { CouponPage } from "../pages/my/coupon/coupon";
import { AccountJifenPage } from "../pages/my/account-jifen/account-jifen";
import { AllOrdersPage } from "../pages/my/all-orders/all-orders";
import { WriteOrdersPage } from "../pages/my/all-orders/write-orders/write-orders";
import { SignupSecondPage } from "../pages/signup/signup-second/signup-second";*/


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  @ViewChild(Nav) nav: Nav;

  constructor(
    private platform: Platform,
    private toastCtrl: ToastController,
    private storage: Storage,
    private ionicApp: IonicApp,
    private events: Events,
    private jpushService: JpushService,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private keyboard: Keyboard
  ) {
    // 初次进入app引导页面
    this.storage.get('hasLoggedIn').then((result) => {
      if (result) {
        this.rootPage = 'TabsPage';
      } else {
        this.storage.get('firstIn').then((result) => {
          if (result) {
            this.rootPage = 'LoginPage';
          } else {
            this.rootPage = 'WelcomePage';
          }
        })
      }
    });
    this.initializeApp();//注册返回按键事件
    //用户失效事件
    this.events.subscribe('signOut', () => {
      this.nav.setRoot('LoginPage');
    })
  }
  ngOnDestroy() {
    this.events.unsubscribe("signOut");
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      if (this.platform.is('mobile') && !this.platform.is('mobileweb')) {
        this.jpushService.initJpush();//初始化极光推送
        this.jpushService.getRegistrationID();
        this.jpushService.setTags();
      }
      this.storage.get('JPUSH_FLAG').then((res) => {
        if (res === 1) {
          this.jpushService.resumePush();
        } else if (res === 0) {
          this.jpushService.stopPush();
        }
      })
      //注册返回按键事件
      this.platform.registerBackButtonAction((): any => {
        if (this.keyboard.isOpen()) {
          this.keyboard.close();
          return;
        }
        let activeVC = this.nav.getActive();
        let page = activeVC.instance;
        let activePortal = this.ionicApp._modalPortal.getActive() || this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive();/*this.ionicApp._toastPortal.getActive() || */
        if (activePortal) {
          activePortal.dismiss().catch(() => { });
          activePortal.onDidDismiss(() => { });
          return;
        }
        //当前页面非tab栏
        if (!(page instanceof TabsPage)) {
          if (!this.nav.canGoBack()) {
            return this.showExit();
          }
          return this.nav.pop();
        }
        let tabs = page.tabs;
        let activeNav = tabs.getSelected();
        //当前页面为tab栏，退出APP,当前页面为tab栏的子页面，正常返回
        return activeNav.canGoBack() ? activeNav.pop() : this.showExit()
      }, 1);

    });
  }
  //双击退出提示框
  showExit() {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'top'
      }).present();
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }
}