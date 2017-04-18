import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { NavController, NavParams, Events, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { ForgotPage } from '../forgot/forgot';

import { AnalyticsServices } from "../../services/analytics";
import { HttpService } from "../../providers/http-service";


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AnalyticsServices]
})
export class LoginPage {
  private loginInfo: { username?: string, password?: string } = {};
  private submitted = false;
  private signedName: String;
  public forgotpage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events,
    private toastCtrl: ToastController,
    public analytics: AnalyticsServices,
    private storage: Storage,
    public httpService:HttpService
  ) {
    this.forgotpage = ForgotPage;
    this.signedName = navParams.get('username');
    this.httpService.getUsername().then((data) => { this.loginInfo.username = this.signedName || data || '' })
  }
  goToHome(form) {
    if (form.valid) {
      this.httpService.login(this.loginInfo).then(data => {
        console.log(data)
        if (data.status == 1) {
          this.httpService.setUsername(this.loginInfo.username);
          this.httpService.setToken(data.data.token);
          this.httpService.setStorage(this.httpService.HAS_LOGGED_IN, true);
          localStorage.setItem('token', data.data.token);
          this.httpService.hasLogin = true;
          // this.events.publish("user:login", user.username);
          let toast = this.toastCtrl.create({
            message: "欢迎回来," + this.loginInfo.username,
            duration: 2000,
            position: "top"
          });
          toast.present();
          this.submitted = true;
          this.analytics.trackEvent("Login", "Successful");//google分析
          this.navCtrl.push(TabsPage);
        }
      })
    }
  }
  goSignup() {
    this.navCtrl.push(SignupPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage')
  }

}
