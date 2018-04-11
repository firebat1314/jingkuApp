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
    this.jPushServ.isPushStopped().then(res => {
      if (res) {
        this.myToggle.value = false;
      } else {
        this.myToggle.value = true;
      }
    }).catch((res) => {
      // console.log(res)
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  goAboutUs() {
    this.navCtrl.push('AccountHelperPage');// AboutUsPage
  }
  toggle(push) {
    if (push.value) {
      this.jPushServ.resumePush(); 
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
  signOut() {
    this.native.openAlertBox('确定退出登陆？', () => {
      this.httpService.logout().then((res) => {
        // console.log(res);
        if (this.native.isMobile()) {
          this.app.getRootNav().setRoot('LoginPage', {}, { animate: true });
        } else {
          this.app.getRootNav().setRoot('WellcomeNewmPage', {}, { animate: true });
        }
        this.httpService.setStorage('hasLoggedIn', false);
        this.httpService.removeStorage("token");
      })
    })
  }
}
