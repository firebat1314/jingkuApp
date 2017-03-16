import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, ToastController, Nav, IonicApp } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { ClassifyPage } from '../pages/classify/classify';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { ParticularsPage } from '../pages/home/particulars/particulars'
import { DredgeMoreCityPage } from '../pages/home/particulars/dredge-more-city/dredge-more-city'
import { PeceiptPage } from "../pages/my/peceipt/peceipt";
import { SettingPage } from "../pages/my/setting/setting";
import { AccountManagementPage } from "../pages/my/account-management/account-management";
import { BrandListPage } from "../pages/home/brand-list/brand-list";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  @ViewChild(Nav) nav: Nav;

  constructor(
    public ionicApp: IonicApp,
    public platform: Platform,
    public toastCtrl: ToastController,
    public storage: Storage
  ) {
    // 初次进入app引导页面
    this.storage.get('hasLoggedIn').then((result) => {
      if (result) {
        this.rootPage = TabsPage;
      } else {
        this.storage.get('firstIn').then((result) => {
          if (result) {
            this.rootPage = LoginPage;
          } else {
            this.rootPage = WelcomePage;
            this.storage.set('firstIn', 'NO');
          }
        }
        )
      }
    });
    this.initializeApp();//注册返回按键事件
  }

  initializeApp() {
    this.platform.ready().then(() => {
      Splashscreen.hide();
      StatusBar.backgroundColorByHexString('#ffffff'); // set status bar to white
      //注册返回按键事件
      this.platform.registerBackButtonAction((): any => {
        console.log(this.nav)
        let activeVC = this.nav.getActive();
        let page = activeVC.instance;
        //当前页面非tab栏
        if (!(page instanceof TabsPage)) {
          if (!this.nav.canGoBack()) {
            return this.showExit();
          }
          return this.nav.pop();
        }
        let tabs = page.tabs;
        let activeNav = tabs.getSelected();
        if (!activeNav.canGoBack()) {
          //当前页面为tab栏，退出APP
          return this.showExit();
        }
        //当前页面为tab栏的子页面，正常返回
        return activeNav.pop();
      }, 101);
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
