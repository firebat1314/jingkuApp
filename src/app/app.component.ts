import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, ToastController, Nav, IonicApp, Events, Keyboard, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { ImageLoaderConfig } from "ionic-image-loader/dist";
import { Native } from "../providers/native";
import { JpushService } from "../providers/jpush-service";
import { UpgradeProvider } from '../providers/upgrade';
import { WxServiceProvider } from '../providers/wx-service/wx-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  rootParams: any;
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
    private keyboard: Keyboard,
    private imageLoaderConfig: ImageLoaderConfig,
    private native: Native,
    private upgradeProvider: UpgradeProvider,
    private app: App,
    private wxService: WxServiceProvider,
  ) {
    //———————————————————————— app更新 ————————————————————————
    this.upgradeProvider.detectionUpgrade();
    this.initializeApp();
    //用户失效事件
    this.events.subscribe('signOut', () => {
      if (this.native.isMobile()) {
        this.nav.setRoot('LoginPage', {}, { animate: true, });
      } else {
        this.nav.setRoot('WellcomeNewmPage', {}, { animate: true, });
      }
    })
  }
  ngOnDestroy() {
    this.events.unsubscribe("signOut");
  }
  initializeApp() {
    this.platform.ready().then(() => {
      window.addEventListener('statusTap', function() {
        console.log(111)
          // scroll-up with document.body.scrollTop = 0; or do whatever you want
      });
      //———————————————————————— 初次进入app引导页面 ————————————————————————
      if (this.native.isMobile()) {
        this.storage.get('has_entered').then((result) => {
          if (!result) {
            this.rootPage = 'WelcomePage';
          } else {
            this.rootPage = 'AppAdvertisingPage';
          }
        })
      } else {
        if (!this.native.isMobileweb()) {
          location.href = 'https://www.jingku.cn/default.html';
          return;
        }
        // this.rootPage = 'WellcomeNewmPage';//TabsPage//WellcomeNewmPage
        this.storage.get('hasLoggedIn').then((result) => {
          if (result) {
            this.rootPage = 'TabsPage';//TabsPage//WellcomeNewmPage
            // this.nav.setRoot('TabsPage', {}, { animate: true, direction: 'forward' });
          } else {
            this.rootPage = 'WellcomeNewmPage';
            // this.nav.setRoot('LoginPage', {}, { animate: true, direction: 'forward' });
          }
        });
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //———————————————————————— 注册返回按键事件 ————————————————————————
      this.platform.registerBackButtonAction((): any => {
        if (this.keyboard.isOpen()) {
          this.keyboard.close();
          return;
        }
        let activeVC = this.nav.getActive();
        let page = activeVC.instance;
        let activePortal = this.ionicApp._modalPortal.getActive() || this.ionicApp._loadingPortal.getActive() /* || this.ionicApp._overlayPortal.getActive(); *//*this.ionicApp._toastPortal.getActive() || */
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
      //————————————————————————————————————————————————————————————————————————
      // 初始化极光推送
      if (this.native.isMobile()) {
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
      if (this.native.isMobileweb()) {
        this.app.viewDidLoad.subscribe((e) => {
          console.log(1, location.href)
          this.wxService.config(location.href, {
            title: '镜库科技', // 分享标题
            link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          })
        })
      }
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