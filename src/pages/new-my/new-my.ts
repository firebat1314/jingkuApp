import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, Events, IonicPage, App } from 'ionic-angular';
import { HttpService } from "../../providers/http-service";

import { Native } from "../../providers/native";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { QimoChatProvider } from '../../providers/qimo-chat/qimo-chat';
import { XimuProvider } from '../../providers/ximu/ximu';

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
  ) {
    console.log(this.isAndroid)
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
        this.httpService.getStorage(res + '_usercount').then((res) => {
          if (res) {
            this.usercount = res;
          }
        })
        this.httpService.getStorage(res + '_userInfo').then((res) => {
          if (res) {
            this.userInfo = res;
          }
        })
        this.httpService.getStorage(res + '_userBaitiao').then((res) => {
          if (res) {
            this.baitiao = res;
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
              this.httpService.setStorage(res + '_usercount', this.usercount)
            }
          })
        }
        this.httpService.userInfo().then((res) => {
          resolve();
          if (res.status == 1) {
            this.userInfo = res;
            this.httpService.getStorage('username').then((res) => {
              if (res) {
                this.httpService.setStorage(res + '_userInfo', this.userInfo)
              }
            })
            // this.httpService.setStorage('phonenumber', res.data.user_info.mobile_phone);
          }
        })
        this.httpService.loan_status().then((res) => {
          this.baitiao = res;
          this.httpService.getStorage('username').then((res) => {
            if (res) {
              this.httpService.setStorage(res + '_userBaitiao', this.baitiao)
            }
          })
        })
      })
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
    this.QimoChat.qimoChatClick();
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
}
