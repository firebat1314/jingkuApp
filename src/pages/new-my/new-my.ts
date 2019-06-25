import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, ViewController, Events, IonicPage, App, Content } from 'ionic-angular';
import { HttpService } from "../../providers/http-service";

import { Native } from "../../providers/native";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ChatProvider } from '../../providers/chat/chat';
import { XimuProvider } from '../../providers/ximu/ximu';
import { MineProvider } from '../../providers/mine/mine';
import { Subscription } from 'rxjs/Subscription';
import { CustomeServicesProvider } from '../../providers/custome-services/custome-services';

@IonicPage()
@Component({
   selector: 'page-new-my',
   templateUrl: 'new-my.html'
})
export class NewMyPage {
   usercount: any;
   userInfo: any;
   baitiao: any;

   isAndroid = this.native.isAndroid();
   isMobile = this.native.isMobile();

   @ViewChild(Content) myContent: Content;

   constructor(
      public viewCtrl: ViewController,
      public navCtrl: NavController,
      public modalCtrl: ModalController,
      public httpService: HttpService,
      public events: Events,
      public native: Native,
      public app: App,
      private iab: InAppBrowser,
      private chat: ChatProvider,
      private ximu: XimuProvider,
      private mine: MineProvider,
      private customeServ: CustomeServicesProvider,
   ) {
      this.events.subscribe('my:update', () => {
         this.httpResult();
      })
   }
   ionViewDidEnter() {
      this.app.setTitle('个人中心');
   }
   ionViewDidLoad() {
      console.log('ionViewDidLoad NewMyPage');
   }
   ngAfterViewInit(){
      /* this.myContent.ionScroll.subscribe((d) => {
        
      }); */
   }
   ngOnInit() {
      this.httpService.getByName('usercount').then((res) => {
         if (res) this.usercount = res;
      });
      this.httpService.getByName('userBaitiao').then((res) => {
         if (res) this.baitiao = res;
      });
      this.httpResult();
   }
   ngOnDestroy() {
      this.events.unsubscribe('my:update');
   }
   httpResult() {
      this.httpService.loan_status().then((res) => {
         this.baitiao = res;
         this.httpService.setByName('userBaitiao', res);
      })
      this.mine.changeUser();
      return this.httpService.userCount().then((res) => {
         if (res.status) {
            this.usercount = res;
            this.httpService.setByName('usercount', res);
         }
      })
   }
   bindWeixin() {
      this.httpService.weixingetOauthRedirect({ user_id: this.mine.userInfo.data.user_info.user_id }).then((res) => {
         if (res.status == 1) {
            location.href = res.url;
         }
      });
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
      // this.chat.qimoChatSDK();
      this.chat.webim();
   }
   goMySalesmanPage() {
      this.navCtrl.push('MySalesmanPage', { salesman: this.mine.userInfo.data.ywy })
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
   // 去往plus会员购买页面方法
   gotoplus(){
     this.navCtrl.push('plusVipShoppingPage')
   }
}
