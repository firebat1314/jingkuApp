import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, ToastController, Nav, IonicApp, Events, Keyboard, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { Native } from "../providers/native";
import { WxServiceProvider } from '../providers/wx-service/wx-service';
import { UpgradeProvider } from '../providers/upgrade/upgrade';
import { ImgcacheProvider } from '../providers/imgcache/imgcache';
import { JpushService } from '../providers/jpush-service';
import { JPush } from '@jiguang-ionic/jpush';

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
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private keyboard: Keyboard,
    private native: Native,
    private upgradeProvider: UpgradeProvider,
    private app: App,
    private wxService: WxServiceProvider,
    private jpushServ: JpushService,
  ) {
    //———————————————————————— app更新 ————————————————————————
    this.initializeApp();
    //用户失效事件
    this.events.subscribe('signOut', () => {
      this.storage.remove('hasLoggedIn');
      this.storage.remove("token");
      this.storage.remove("login_info");
      this.jpushServ.deleteAlias();//删除推送别名
      this.jpushServ.cleanTags();//删除推送标签
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
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.native.isAndroid() ? this.statusBar.styleLightContent() : this.statusBar.styleDefault();
      this.splashScreen.hide();

      //———————————————————————— 初次进入app引导页面 ————————————————————————
      if (this.native.isMobile()) {
        this.upgradeProvider.detectionUpgrade();
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
            if (location.href.indexOf('signup') > -1) {
              // this.rootPage = 'SignupPage';
            } else {
              this.rootPage = 'WellcomeNewmPage';
            }
            // this.nav.setRoot('LoginPage', {}, { animate: true, direction: 'forward' });
          }
        });
      }
      // 初始化极光推送
      this.jpushServ.init();
      this.jpushServ.setDebugMode(false);
      this.jpushServ.getRegistrationID().then(res => {
        this.jpushServ.setTags([res]);
      })
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
          return this.nav.pop().catch(res => { history.back() });
        }
        let tabs = page.tabs;
        let activeNav = tabs.getSelected();
        //当前页面为tab栏，退出APP,当前页面为tab栏的子页面，正常返回
        return activeNav.canGoBack() ? activeNav.pop() : this.showExit()
      }, 1);
      //————————————————————————————————————————————————————————————————————————
      var timer;
      if (this.native.isWeixin()) {
        this.app.viewDidEnter.subscribe((e) => {
          clearTimeout(timer)
          timer = setTimeout(() => {
            this.wxService.config(location.href, {
              title: '镜库科技', // 分享标题
              link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            })
          }, 500);
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