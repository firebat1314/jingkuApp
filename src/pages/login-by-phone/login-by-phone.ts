import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ToastController } from 'ionic-angular';
import { HttpService } from '../../providers/http-service';

/**
 * Generated class for the LoginByPhonePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-by-phone',
  templateUrl: 'login-by-phone.html',
})
export class LoginByPhonePage {

  loginInfo = {
    userphone: '',
    mobile_code: '',
    type:'phone'
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public toastCtrl: ToastController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginByPhonePage');
  }

  private wait: number = 60;
  private disabled: Boolean = false;
  private value: String = '发送验证码';
  private timer: any;
  private time() {
    if (this.wait == 0) {
      this.disabled = false;
      this.timer = null;
      this.value = "发送验证码";
      this.wait = 60;
      return;
    } else {
      this.disabled = true;
      this.value = "" + this.wait + " 秒后重新发送";
      let self = this;
      this.timer = setTimeout(function () {
        self.wait--;
        self.time();
      }, 1000)
    }
  }

  getMobileCode() {
    this.httpService.getMobileCode({
      mobile: this.loginInfo.userphone,
      type: 'mind',
      is_verify: 1,
    }).then(data => {
      // console.log(data)
      if (data.status) {
        this.time();
      }
    })
  }
  login() {
    this.httpService.login(this.loginInfo).then(data => {
      if (data.status == 1) {
        this.httpService.setToken(data.data.token);
        this.httpService.setStorage(this.httpService.HAS_LOGGED_IN, true);

        let toast = this.toastCtrl.create({
          message: "欢迎回来，" + data.data.user_name || this.loginInfo.userphone,
          duration: 2000,
          position: "top"
        });
        setTimeout(() => {
          this.navCtrl.setRoot('TabsPage', {}, { animate: true, direction: 'forward' }).then(() => {
            toast.present();
          });
        }, 100);
      }
    })
  }
}
