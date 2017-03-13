import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { LoginPage } from "../../login/login";
import { Storage } from '@ionic/storage';

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

  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  Logout() {
    this.app.getRootNav().setRoot(LoginPage);
    this.storage.set('hasLoggedIn', false);
    this.storage.remove("token");
    this.storage.remove("username");
  }
}
