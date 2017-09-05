import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, App, Toggle, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { JpushService } from "../../../providers/jpush-service";
import { Native } from "../../../providers/native";

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public jpushService: JpushService,
    public native: Native,
    public httpService: HttpService
  ) { }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  goAboutUs() {
    this.navCtrl.push('AccountHelperPage');// AboutUsPage
  }
  clearCathe() {
    this.native.openAlertBox('清除本地缓存？', () => {
      this.httpService.clear(() => {
        this.httpService.setStorage('firstIn', true);
        setTimeout(() => {
          this.native.showToast('已清空缓存');
        }, 500);
      })
    })
  }
  signOut() {
    this.native.openAlertBox('确定退出登陆？', () => {
      this.httpService.logout().then((res) => {
        // console.log(res);
        this.app.getRootNav().setRoot('LoginPage', {}, { animate: true });
        this.httpService.setStorage('hasLoggedIn', false);
        this.httpService.removeStorage("token");
      })
    })
  }
}
