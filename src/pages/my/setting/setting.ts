import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, App, Toggle, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";
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
    public jPush: JPush
  ) { }

  ngAfterViewInit() {
    this.jPush.isPushStopped().then(res=>{
      if (res) {
        this.myToggle.value = true;
      } else {
        this.myToggle.value = false;
      }
    }).catch((res)=>{
      console.log(res)
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
      this.jPush.stopPush();
    } else {
      this.jPush.resumePush();
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
