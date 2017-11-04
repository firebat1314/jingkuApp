import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, Events, IonicPage, App } from 'ionic-angular';
import { HttpService } from "../../providers/http-service";

import { Native } from "../../providers/native";
import { InAppBrowser } from '@ionic-native/in-app-browser';

declare var cordova: any;
declare let qimoChatClick;

@IonicPage()
@Component({
  selector: 'page-new-my',
  templateUrl: 'new-my.html'
})
export class NewMyPage {
  usercount: any;
  userInfo: any;
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public httpService: HttpService,
    public events: Events,
    public native: Native,
    public app: App,
    private iab: InAppBrowser,
  ) {
    /* this.httpService.getStorage('username').then((username) => {
      this.httpService.getStorage(username).then((userInfo) => {
        this.userInfo = userInfo;
      })
    }) */
    /* this.events.subscribe('avatar:update', () => {
      this.httpResult();
    }) */
    this.events.subscribe('my:update', () => {
      this.httpResult();
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewMyPage');
  }
  ngOnInit() {
    this.httpResult();
  }
  httpResult(finish?) {
    this.native.showLoading();
    return new Promise((resolve, reject) => {
      this.httpService.userCount().then((res) => {
        if (res.status == 1) {
          this.usercount = res;
        }
        this.httpService.userInfo().then((res) => {
          resolve();
          this.native.hideLoading();
          if (res.status == 1) {
            this.userInfo = res;
            // this.httpService.setStorage(res.data.username, res);
            // this.httpService.setStorage('phonenumber', res.data.user_info.mobile_phone);
          }
          if (finish) { finish(); }
        })
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
  goAccountServicePage(access_id) {
    /* this.native.openAlertBox('拨打客服电话：400-080-5118', () => {
      this.native.openCallNumber('400-080-5118', false);
    }) */
    // this.native.showToast('敬请期待')
    if (!access_id) {
      // this.native.showToast('该店铺暂无客服');
    }
    var old = document.getElementsByClassName('qimo')[0]
    //console.log(old);
    if (old) {
      old.parentNode.removeChild(old);
    }
    let qimo: HTMLScriptElement = document.createElement('script');
    qimo.src = 'https://webchat.7moor.com/javascripts/7moorInit.js?accessId=' + (access_id||'b441f710-80d9-11e7-8ddd-b18e4f0e2471') + '&autoShow=false';
    console.log(qimo.src)
    qimo.className = 'qimo';
    document.getElementsByTagName('body')[0].appendChild(qimo);
    qimo.onload = function () {
      setTimeout(function () {
        qimoChatClick();
      }, 400);
    }
    // this.navCtrl.push(AccountServicePage)
  }
  goMySalesmanPage() {
    this.navCtrl.push('MySalesmanPage', { salesman: this.userInfo.data.ywy })
  }
  goAccountManagementPage(event) {
    event.stopPropagation();
    this.navCtrl.push('AccountManagementPage', { avatar: this.userInfo.data.avatar, username: this.userInfo.data.username });
  }
  signOut() {
    this.native.openAlertBox('确定退出登陆？', () => {
      this.httpService.logout().then((res) => {
        this.app.getRootNav().setRoot('LoginPage', {}, { animate: true });
        this.httpService.setStorage('hasLoggedIn', false);
        this.httpService.removeStorage("token");
      })
    })
  }
  openXimu() {
    // this.native.showToast('暂未开放', null, false);
    this.httpService.Ximu().then((res) => {
      if (res.status) {
        // this.navCtrl.push('IframeBrowserPage', { url: res.data.url });
        cordova.exec(
          (result) => {
            if (result != null) {this.native.showToast(result, null, false);}
          },
          (msg) => {
            this.native.showToast(msg, null, false);
          },
          "CallActivityPlugin",
          "call",[res.data.url])

        // this.navCtrl.push('IframeBrowserPage',{url:res.data.url});
        /* if (this.native.isMobile()) {
          this.iab.create(res.data.url, '_system');
        } else {
          location.href = (res.data.url)
        } */
      }
    })
  }
}
