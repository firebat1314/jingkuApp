import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, ToastController, Nav, IonicApp } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  @ViewChild('content') nav: Nav;

  constructor(public ionicApp: IonicApp, public platform: Platform, public toastCtrl: ToastController, public storage: Storage) {
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
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      Splashscreen.hide();
      StatusBar.overlaysWebView(false); // let status bar overlay webview
      StatusBar.backgroundColorByHexString('#bdbdbd'); // set status bar to white
      this.registerBackButtonAction();//注册返回按键事件
    });
  }
  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
      // this.ionicApp._toastPortal.getActive() || this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive()
      let activePortal = this.ionicApp._modalPortal.getActive();
      if (activePortal) {
        activePortal.dismiss().catch(() => { });
        activePortal.onDidDismiss(() => { });
        return;
      }
      let activeVC = this.nav.getActive();
      let tabs = activeVC.instance.tabs;
      let activeNav = tabs.getSelected();
      return activeNav.canGoBack() ? activeNav.pop() : this.showExit()
    }, 1);
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
