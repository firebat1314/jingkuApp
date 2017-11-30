import { Component } from '@angular/core';

import { NavController, NavParams, Events, ToastController, IonicPage, AlertController } from 'ionic-angular';

import { HttpService } from "../../providers/http-service";

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private loginInfo: { username?: string, password?: string } = {};
  private signedName: String;
  ForgotPage = 'ForgotPage';
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private events: Events,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private httpService: HttpService,
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
        // console.log(data)
        if (data.status == 1) {
          
          this.httpService.setStorage('token', data.data.token);
          this.httpService.setStorage('hasLoggedIn', true);
          this.httpService.setStorage('username', data.data.username);
          this.httpService.setStorage('login_info', data);

          let toast = this.toastCtrl.create({
            message: "欢迎回来，" + data.data.user_name || this.loginInfo.username,
            duration: 2000,
            position: "top"
          });
          setTimeout(() => {
            this.navCtrl.setRoot('TabsPage', {}, { animate: true, direction: 'forward' }).then(() => {
              toast.present();
            });
          }, 100);
        } else if (data.status == -1) {
          this.alertCtrl.create({
            title: '镜库科技',
            message: data.info,
            buttons: [
              {
                text: '确定',
              }
            ]
          }).present();
        }
      })
    }
  }
  goSignup() {
    this.navCtrl.push('SignupPage');
  }
}
