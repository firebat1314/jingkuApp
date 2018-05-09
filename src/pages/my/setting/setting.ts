import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, App, Toggle, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";
import { JpushService } from '../../../providers/jpush-service';
import { JPush } from '@jiguang-ionic/jpush';

/*
  Generated class for the Setting page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {
  @ViewChild(Toggle) myToggle: Toggle

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public native: Native,
    public httpService: HttpService,
    public jPushServ: JpushService
  ) { }

  ngAfterViewInit() {
    // this.jPushServ.getUserNotificationSettings().then(res => {
      // if (res) {//设备已开启推送功能
        this.jPushServ.isPushStopped().then(res => {
          if (res) {
            this.myToggle.value = false;
          } else {
            this.myToggle.value = true;
          }
        }).catch((res) => {
          this.myToggle.value = true;
        })
      // }
    // })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  goAboutUs() {
    this.navCtrl.push('AccountHelperPage');// AboutUsPage
  }
  toggle(push) {
    if (push.value) {
      // this.jPushServ.getUserNotificationSettings().then(res => {
        // if (res) {
          this.jPushServ.resumePush();
        // }else{
          // this.myToggle.value = false;
        // }
      // })
    } else {
      this.jPushServ.stopPush();
    }
  }
  clearCathe() {
    this.native.openAlertBox('清除本地缓存？', () => {
      this.httpService.clear(() => {
        // this.httpService.setStorage('has_entered', false);
        setTimeout(() => {
          this.native.showToast('已清空缓存');
          if (!this.native.isMobile()) {
            this.app.getRootNav().setRoot('LoginPage', {}, { animate: true });
          }
        }, 500);
      })
    })
  }
}
