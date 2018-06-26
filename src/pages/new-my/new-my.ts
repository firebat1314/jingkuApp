import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, Events, IonicPage, App } from 'ionic-angular';
import { HttpService } from "../../providers/http-service";

import { Native } from "../../providers/native";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { QimoChatProvider } from '../../providers/qimo-chat/qimo-chat';
import { XimuProvider } from '../../providers/ximu/ximu';
import { MineProvider } from '../../providers/mine/mine';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
   selector: 'page-new-my',
   templateUrl: 'new-my.html'
})
export class NewMyPage {
   FmCreditindex: any;
   currentUser: Subscription;
   usercount: any;
   userInfo: any;
   baitiao: any;

   isAndroid = this.native.isAndroid();
   isMobile = this.native.isMobile();

   constructor(
      public viewCtrl: ViewController,
      public navCtrl: NavController,
      public modalCtrl: ModalController,
      public httpService: HttpService,
      public events: Events,
      public native: Native,
      public app: App,
      private iab: InAppBrowser,
      private QimoChat: QimoChatProvider,
      private ximu: XimuProvider,
      private mine: MineProvider,
   ) {
      this.events.subscribe('my:update', () => {
         this.httpResult();
      })
      this.currentUser = this.mine.currentUser.subscribe(data => {
         this.userInfo = data;
         if (!data.data.wx_openid && !this.native.isWeixin()) this.httpService.weixingetOauthRedirect({ user_id: data.data.user_info.user_id });
      })
   }
   ionViewDidLoad() {
      console.log('ionViewDidLoad NewMyPage');
   }
   ngOnInit() {
      this.httpService.getByName('usercount').then((res) => {
         if (res) this.usercount = res;
      });
      this.httpService.getByName('userInfo').then((res) => {
         if (res) this.userInfo = res;
      });
      this.httpService.getByName('userBaitiao').then((res) => {
         if (res) this.baitiao = res;
      });
      this.httpResult();
   }
   ngOnDestroy() {
      this.currentUser.unsubscribe();
      this.events.unsubscribe('my:update');
   }
   httpResult() {
      this.httpService.loan_status().then((res) => {
         this.baitiao = res;
         this.httpService.setByName('userBaitiao', res);
      })
      this.httpService.FmCreditindex().then(res => {
         if (res.status == 1) {
            this.FmCreditindex = res;
         }
      })
      this.mine.changeUser();
      return this.httpService.userCount().then((res) => {
         if (res.status) {
            this.usercount = res;
            this.httpService.setByName('usercount', res);
         }
      })
   }
   /*下拉刷新*/
   doRefresh(refresher) {
      this.httpResult().then(() => {
         setTimeout(() => {
            refresher.complete();
         }, 500);
      })
   }
   goSettingPage() {
      this.navCtrl.push('SettingPage')
   }
   goMessagePage() {
      this.navCtrl.push('MessagePage')
   }
   goRepairReturnPage() {
      // console.log(1)
      // this.native.showToast('暂未开放',null,false);
      this.navCtrl.push('RepairReturnPage');
   }
   goAccountProcessPage() {
      // this.native.showToast('暂未开放',null,false);
      this.navCtrl.push('AccountProcessPage');
   }
   goAccountServicePage() {
      this.QimoChat.qimoChatSDK();
   }
   goMySalesmanPage() {
      this.navCtrl.push('MySalesmanPage', { salesman: this.userInfo.data.ywy })
   }
   goAccountManagementPage(event) {
      event.stopPropagation();
      this.navCtrl.push('AccountManagementPage');
   }/* 
	signOut() {
		this.native.openAlertBox('确定退出登陆？', () => {
			this.httpService.logout().then((res) => {
				this.app.getRootNav().setRoot('LoginPage', {}, { animate: true });
				this.httpService.setStorage('hasLoggedIn', false);
				this.httpService.removeStorage("token");
			})
		})
	} */
   openXimu() {
      // if (this.native.isAndroid()) {
      if (this.baitiao.status) {
         this.ximu.openXimu(this.baitiao.data.url);
      } else {
         this.navCtrl.push('BtAuthorizationPage');
      }
      // } else {
      // this.native.showToast('该功能现仅在安卓客户端开放', null, true);
      // }
   }
   openFmCredit() {
      this.httpService.FmCreditGate().then(res => {
         if(res.status==1){
            this.navCtrl.push('IframeBrowserPage', {
               browser: {
                  title: '镜库金融',
                  url: 'https://www.jingku.cn/openFmCredit.html?data=' + encodeURIComponent(res.data) + '&url=' + encodeURIComponent(res.api_url),
   
               }
            })
         }
         // this.navCtrl.push('ViewerContractPage',{url:'http://newpc.jingkoo.net/openFmCredit.html?data=' + encodeURIComponent(res.data) + '&url=' + encodeURIComponent(res.api_url)});
         // if (this.native.isMobile()) {
         // this.iab.create('http://newpc.jingkoo.net/openFmCredit.html?data=' + encodeURIComponent(res.data) + '&url=' + encodeURIComponent(res.api_url), this.native.isMobile() ? '_system' : '_self');
      })
      // } else {
      // 	var tempwindow = window.open(); // 先打开页面
      // 	this.httpService.FmCreditGate().then(res => {
      // 		tempwindow.location.href = 'http://newpc.jingkoo.net/openFmCredit.html?data=' + encodeURIComponent(res.data) + '&url=' + encodeURIComponent(res.api_url); // 后更改页面地址
      // 	})
      // }
   }
   openSHD() {
      this.httpService.Shd_add_user().then(res => {
         if (res.status == 1) {
            this.navCtrl.push('BTIndexPage');
         }
      })
   }
}
