import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController } from 'ionic-angular';
import { LoginPage } from "../../login/login";
import { Storage } from '@ionic/storage';
import { AboutUsPage } from "./about-us/about-us";
import { HttpService } from "../../../providers/http-service";

/*
  Generated class for the Setting page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public storage: Storage,
    public alert: AlertController,
    public httpService: HttpService
  ) { }
  goAboutUs() {
    this.navCtrl.push(AboutUsPage);
  }
  clearCathe() {
    let myalert = this.alert.create({
      subTitle: '确定清除本地缓存？',
      cssClass: 'alert-style',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确认',
          handler: () => {
            console.log('ok clicked');
          }
        }
      ]
    });
    myalert.present();
  }
  signOut() {
    let myalert = this.alert.create({
      subTitle: '确定退出登陆？',
      cssClass: 'alert-style',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确认',
          handler: () => {
            console.log('ok clicked');
            this.httpService.logout().then((res) => {
              console.log(res)
              this.app.getRootNav().setRoot(LoginPage);
              this.storage.set('hasLoggedIn', false);
              this.storage.remove("token");
              this.storage.remove("username");
            })
          }
        }
      ]
    });
    myalert.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
}
