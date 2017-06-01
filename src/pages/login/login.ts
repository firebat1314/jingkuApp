import { Component } from '@angular/core';

import { NavController, NavParams, Events, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { ForgotPage } from '../forgot/forgot';

import { HttpService } from "../../providers/http-service";


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private loginInfo: { username?: string, password?: string } = {};
  private submitted = false;
  private signedName: String;
  private forgotpage = ForgotPage;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private events: Events,
    private toastCtrl: ToastController,
    private httpService: HttpService
  ) {
    this.signedName = navParams.get('username');
    this.httpService.getUsername().then((data) => { this.loginInfo.username = this.signedName || data || '' })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage')
  }
  goToHome(form) {
    if (form.valid) {
      this.httpService.login(this.loginInfo).then(data => {
        console.log(data)
        if (data.status == 1) {
          this.httpService.setUsername(this.loginInfo.username);
          this.httpService.setToken(data.data.token);
          this.httpService.setStorage(this.httpService.HAS_LOGGED_IN, true);
          this.httpService.hasLogin = true;
          // this.events.publish("user:login", user.username);
          let toast = this.toastCtrl.create({
            message: "欢迎回来," + this.loginInfo.username,
            duration: 2000,
            position: "top"
          });
          toast.present();
          this.submitted = true;
          setTimeout(() => {
            this.navCtrl.setRoot(TabsPage);
          }, 100)
        }
      })
    }
  }
  goSignup() {
    this.navCtrl.push(SignupPage);
  }
}
