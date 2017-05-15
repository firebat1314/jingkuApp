import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Http } from "@angular/http";
import { Storage } from '@ionic/storage';
import { UserData } from "../../services/user-data";

import { LoginPage } from '../login/login';
import { SignupSecondPage } from './signup-second/signup-second';
import { HttpService } from "../../providers/http-service";

/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  private signupInfo = {
    user_name: '',
    mobile_phone: '',
    password: '',
    cpassword: '',
    Phone_code: '',
    str_verify: ''
  };
  private skey;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userData: UserData,
    private events: Events,
    public http: Http,
    public storage: Storage,
    public httpService: HttpService

  ) {
    this.getSkey();
  }

  registerBtn() {
    this.httpService.signupFirst(this.signupInfo).then(
      data => {
        this.navCtrl.push(SignupSecondPage);
        this.events.publish("user:signupFirst", this.signupInfo.user_name);
        if (data.status == 1) {
          this.httpService.setUsername(this.signupInfo.user_name)
        }
      },
      error => {
        console.log('注册出错')
        this.events.publish("user:signupFirst:error");
      }
    );
  }
  logForm(signupForm) {
    console.log(signupForm)
  }
  private verifyImg;
  private getSkey() {
    this.httpService.getVerificationImg({
      fontSize: '12',
      length: '4',
      useNoise: 'false',
      codeSet: '0',
    }).then(
      data => {
        console.log(data);
        if (data.status == 1) {
          this.skey = data.data.skey;
          this.getImg()
        }
      })
  }
  private getImg() {
    this.httpService.getVerificationImg({
      fontSize: '12',
      length: '4',
      useNoise: 'false',
      codeSet: '0',
      skey: this.skey
    }).then(
      data => {
        console.log(data);
        if (data.status == 1) {
          this.verifyImg = data.data.captcha + '?' + Math.random();
          this.skey = data.data.skey
        }
      },
      error => {
        console.log(error);
      }
      );
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
      this.value = "(" + this.wait + ")秒后重新发送";
      let self = this;
      this.timer = setTimeout(function () {
        self.wait--;
        self.time();
      }, 1000)
    }
  }

  getMobileCode() {
    this.httpService.getMobileCode({
      type: 'reg',
      mobile: this.signupInfo.mobile_phone,
      verify: this.signupInfo.str_verify,
      skey: this.skey
    }).then(data => {
      console.log(data)
      if (data.status) {
        this.time();
      } else  {
        this.getImg();
      }
    })
  }

  toLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
