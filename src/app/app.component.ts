import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, ToastController, Nav, IonicApp, Events, Keyboard, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { Native } from "../providers/native";
import { WxServiceProvider } from '../providers/wx-service/wx-service';
import { UpgradeProvider } from '../providers/upgrade/upgrade';
import { IP } from '../providers/constants';
import { HttpService } from '../providers/http-service';

declare var _hmt;
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
      private httpServ: HttpService,
   ) {

      this.initializeApp();
      //用户失效事件
      this.events.subscribe('signOut', () => {
         this.storage.remove('hasLoggedIn');
         this.storage.remove("token");
         this.storage.remove("login_info");
         if (this.native.isMobile()) {
            this.nav.setRoot('LoginPage', {}, { animate: true, });
         } else {
            this.nav.setRoot('WellcomeNewmPage', {}, { animate: true, });
         }
      });
      if (IP.indexOf('new') > -1) {
         //百度账号 15733128449
         let hm = document.createElement("script");
         hm.src = "https://hm.baidu.com/hm.js?132db54c145d04b9c27a03e2cd28200c";//newm.jingkoo.net
         let s = document.getElementsByTagName("script")[0];
         s.parentNode.insertBefore(hm, s);
         //百度账号 镜库科技
         hm = document.createElement("script");
         hm.src = "https://hm.baidu.com/hm.js?817930cdefe1732f6a0cfff75e3ca4ae";//newm.jingkoo.net
         s = document.getElementsByTagName("script")[0];
         s.parentNode.insertBefore(hm, s);

      } else {
         //百度账号 15733128449
         let hm = document.createElement("script");
         hm.src = "https://hm.baidu.com/hm.js?2d2e5da3c0f5c5cd693f193b8dfab54e";//m.jingku.cn
         let s = document.getElementsByTagName("script")[0];
         s.parentNode.insertBefore(hm, s);
         //百度账号 镜库科技
         hm = document.createElement("script");
         hm.src = "https://hm.baidu.com/hm.js?e46d288858f5b97ae7ecc8924d67d3f0";//m.jingku.cn
         s = document.getElementsByTagName("script")[0];
         s.parentNode.insertBefore(hm, s);
      }
      this.app.viewWillEnter.subscribe((e) => {
         if (e._cssClass == 'ion-page') {
            if(e.id=="ParticularsPage"){
               this.httpServ.click_census({ type: 'goods', url: '/' + location.hash, id: e.data.goodsId });//用户点击统计
            }
            if(e.id=="HelperDetailsPage"){
               this.httpServ.click_census({ type: 'article', url: '/' + location.hash, id: e.data.article_id });//用户点击统计
            }
         }
      })
      this.app.viewDidEnter.subscribe((e) => {
         if (e._cssClass == 'ion-page') {
            setTimeout(() => {
               if (this.native.isMobileweb()) {
                  //百度统计 
                  if (IP.indexOf('new') > -1) {
                     //百度账号 15733128449
                     _hmt.push(['_setAccount', '132db54c145d04b9c27a03e2cd28200c']);
                     _hmt.push(['_trackPageview', '/' + location.hash]);
                     //百度账号 镜库科技
                     _hmt.push(['_setAccount', '817930cdefe1732f6a0cfff75e3ca4ae']);
                     _hmt.push(['_trackPageview', '/' + location.hash]);
                  } else {
                     //百度账号 15733128449
                     _hmt.push(['_setAccount', '2d2e5da3c0f5c5cd693f193b8dfab54e']);
                     _hmt.push(['_trackPageview', '/' + location.hash]);
                     //百度账号 镜库科技
                     _hmt.push(['_setAccount', 'e46d288858f5b97ae7ecc8924d67d3f0']);
                     _hmt.push(['_trackPageview', '/' + location.hash]);
                  }
               }
               if (this.native.isWeixin()) {
                  this.wxService.config(location.href, {
                     title: '镜库科技', // 分享标题
                     link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  })
               }
            }, 300);
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
            //———————————————————————— app更新 ————————————————————————
            this.upgradeProvider.detectionUpgrade();
            this.storage.get('has_entered').then((result) => {
               if (!result) {
                  this.rootPage = 'WelcomePage';
               } else {
                  this.rootPage = 'AppAdvertisingPage';
               }
            })
         } else {
            // if ((!this.native.isMobileweb())&&(!this.native.isWeixin())) {
            if (!this.native.isMobileweb()) {
               location.href = 'https://www.jingku.cn/default.html';
               return;
            }
            // this.rootPage = 'WellcomeNewmPage';
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