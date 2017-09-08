import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, ToastController, Nav, IonicApp, Events, Keyboard } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { ImageLoaderConfig } from "ionic-image-loader/dist";
import { Native } from "../providers/native";

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
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private keyboard: Keyboard,
    private imageLoaderConfig: ImageLoaderConfig,
    private native: Native,
  ) {

    //————————————————————————————————————————————————————————————————————————
    // 初次进入app引导页面
    console.log(this.native.isMobile())
    if (this.native.isMobile()) {
      this.storage.get('has_entered').then((result) => {
        if (!result) {
          this.rootPage = 'WelcomePage';
        } else {
          this.rootPage = 'AppAdvertisingPage';
        }
      })
    } else {
      this.storage.get('hasLoggedIn').then((result) => {
        if (result) {
          this.rootPage = 'TabsPage';//TabsPage//WellcomeNewmPage
          // this.nav.setRoot('TabsPage', {}, { animate: true, direction: 'forward' });
        } else {
          this.rootPage = 'LoginPage';
          // this.nav.setRoot('LoginPage', {}, { animate: true, direction: 'forward' });
        }
      });
    }
    //————————————————————————————————————————————————————————————————————————
    // app更新
    this.initializeApp();
    //用户失效事件
    this.events.subscribe('signOut', () => {
      this.nav.setRoot('LoginPage', {}, { animate: true, });
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

      //————————————————————————————————————————————————————————————————————————
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
      //————————————————————————————————————————————————————————————————————————
      //ionic-image-loader optional
      this.imageLoaderConfig.setFallbackUrl('../assets/images/images/800-800.jpg'); // if images fail to load, display this image instead
      this.imageLoaderConfig.setCacheDirectoryName('jingkuapp-loader-cache');
      this.imageLoaderConfig.setMaximumCacheSize(100 * 1024 * 1024); // set max size to 20MB
      this.imageLoaderConfig.setMaximumCacheAge(7 * 24 * 60 * 60 * 1000); // 7 days
      this.imageLoaderConfig.setSpinnerName('circles')
      this.imageLoaderConfig.useImageTag(true); // use `<img>` tag by default
      //————————————————————————————————————————————————————————————————————————
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