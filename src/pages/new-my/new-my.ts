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
    this.httpService.getStorage('username').then((res) => {
      if (res) {
        this.httpService.getStorage(res+'_usercount').then((res) => {
          if (res) {
            this.usercount = res;
          }
        })
        this.httpService.getStorage(res+'_userInfo').then((res) => {
          if (res) {
            this.userInfo = res;
          }
        })
      }
    })
    
    this.httpResult();
  }
  httpResult() {
    return new Promise((resolve, reject) => {
      this.httpService.userCount().then((res) => {
        if (res.status == 1) {
          this.usercount = res;
          this.httpService.getStorage('username').then((res) => {
            if (res) {
              this.httpService.setStorage(res+'_usercount', this.usercount)
            }
          })
        }
        this.httpService.userInfo().then((res) => {
          resolve();
          if (res.status == 1) {
            this.userInfo = res;
            this.httpService.getStorage('username').then((res) => {
              if (res) {
                this.httpService.setStorage(res+'_userInfo', this.userInfo)
              }
            })
            // this.httpService.setStorage('phonenumber', res.data.user_info.mobile_phone);
          }
        })
      })
    })

  }
  
  /*下拉刷新*/
  doRefresh(refresher) {
    this.httpResult().then(()=>{
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
    // this.native.showToast('敬请期待')
    console.log(access_id)
    this.native.showLoading();
    if (!access_id) {
      // this.native.showToast('该店铺暂无客服');
    }
    var old = document.getElementsByClassName('qimo')[0]
    //console.log(old);
    if (old) {
      old.parentNode.removeChild(old);
    }
    let qimo: HTMLScriptElement = document.createElement('script');
    qimo.type = 'text/javascript';
    qimo.src = 'https://webchat.7moor.com/javascripts/7moorInit.js?accessId=' + (access_id || 'b441f710-80d9-11e7-8ddd-b18e4f0e2471') + '&autoShow=false';
    console.log(qimo.src)
    qimo.className = 'qimo';
    document.getElementsByTagName('body')[0].appendChild(qimo);
    let that = this;
    qimo.onload = qimo['onreadystatechange'] = function () {
      that.native.hideLoading();
      if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
        setTimeout(function () {
          qimoChatClick();
        }, 600);
        qimo.onload = qimo['onreadystatechange'] = null;
      }
    };
  }
  goMySalesmanPage() {
    this.navCtrl.push('MySalesmanPage', { salesman: this.userInfo.data.ywy })
  }
  goAccountManagementPage(event) {
    event.stopPropagation();
    this.navCtrl.push('AccountManagementPage');
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
    this.native.showToast('暂未开放', null, false);

    /* this.httpService.Ximu().then((res) => {
      this.navCtrl.push('IframeBrowserPage', { url: res.data.url });
      if (res.status) {
        cordova.exec(
          (result) => {
            if (result != null) {this.native.showToast(result, null, false);}
          },
          (msg) => {
            this.native.showToast(msg, null, false);
          },
          "CallActivityPlugin",
          "call",[res.data.url])

         if (this.native.isMobile()) {
          this.iab.create(res.data.url, '_system');
        } else {
          location.href = (res.data.url)
        } 
      }
    }) */
  }
}
