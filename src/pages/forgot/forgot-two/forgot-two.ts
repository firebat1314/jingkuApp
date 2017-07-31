import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";

/*
  Generated class for the ForgotTwo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-forgot-two',
  templateUrl: 'forgot-two.html'
})
export class ForgotTwoPage {
  phoneNumber = this.navParams.get('phoneNumber');
  password;
  cpassword;
  Phone_code;
  str_verify;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService
  ) {
    this.getSkey();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotTwoPage');
  }
  ngOnDestroy() {
    clearInterval(this.timer)
  }

  private verifyImg;
  private skey;
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
      });
  }
  getMobileCode() {
    this.httpService.getMobileCode({
      type: 'mind',
      mobile: this.phoneNumber,
      verify: this.str_verify,
      skey: this.skey
    }).then(data => {
      console.log(data)
      if (data.status) {
        this.time();
      } else {
        this.getImg();
      }
    })
  }
  private wait: number = 60;
  private disabled: Boolean = false;
  private value: String = '发送验证码';
  private timer = null;
  private time() {
    if (this.wait == 0) {
      this.disabled = false;
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
  onSubmit() {
    this.httpService.forgotPwd({
      step: 'two',
      password: this.password,
      cpassword: this.cpassword,
      str_verify: this.str_verify,
      verify: this.Phone_code,
      mobile_phone:this.phoneNumber
    }).then((res)=>{
      if(res.status==1){
        this.navCtrl.push('ForgotThreePage')
      }
    })
  }
}
