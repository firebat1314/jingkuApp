import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, Events, IonicPage, App } from 'ionic-angular';
import { HttpService } from "../../providers/http-service";

import { Native } from "../../providers/native";
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-my',
  templateUrl: 'my.html'
})
export class MyPage {
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
    console.log('ionViewDidLoad MyPages');
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
  goAccountServicePage() {
    this.native.openAlertBox('拨打客服电话：400-080-5118', () => {
      this.native.openCallNumber('400-080-5118', false);
    })
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
    this.httpService.Ximu().then((res) => {
      if (res.status) {
        if (this.native.isMobile()) {
          this.iab.create(res.data.url, '_system');
        } else {
          location.href = (res.data.url)
        }
      }
    })

  }
}
