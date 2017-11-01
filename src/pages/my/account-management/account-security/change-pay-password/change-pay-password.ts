import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ToastController, Events } from 'ionic-angular';
import { HttpService } from '../../../../../providers/http-service';

/**
 * Generated class for the ChangePayPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-change-pay-password',
  templateUrl: 'change-pay-password.html',
})
export class ChangePayPasswordPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public events: Events,
    public toastCtrl: ToastController,
  ) { }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePayPasswordPage');
    this.getSkey()
  }
  ngOnDestroy() {
    clearInterval(this.timer);
  }
  formData = {
    phone: '',//phone
    verify: '',//verify
    phone_code: '',//phone_code
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
  verifyImg: string;
  skey: string;

  getSkey() {
    this.httpService.getVerificationImg({
      fontSize: 14,
      length: 4,
      useNoise: 0,
      codeSet: 0,
    }).then((data) => {
      if (data.status == 1) {
        this.skey = data.data.skey;
        this.getImg()
      }
    })
  }
  getImg() {
    this.httpService.getVerificationImg({
      fontSize: 14,
      length: 4,
      useNoise: 0,
      codeSet: 0,
      skey: this.skey
    }).then((data) => {
      if (data.status == 1) {
        var verifyImgSrc = data.data.captcha
        this.verifyImg = verifyImgSrc + '?' + Math.random();
        this.skey = data.data.skey;
      }
    });
  }
  getMobileCode() {
    this.httpService.getMobileCode({
      type: 'mind',
      mobile: this.formData.phone,
      verify: this.formData.verify,
      skey: this.skey
    }).then(data => {
      if (data.status) {
        this.time();
      } else {
        this.getSkey();
      }
    })
  }
  onSubmit(event) {
    console.log(event);
  }
  onsubmit() {
    this.httpService.editPaypwd(this.formData).then((res) => {
      if (res.status == 1) {
        this.toastCtrl.create({
          message: '修改成功',
          duration: 2000,
          position: 'top',
          showCloseButton: false
        }).present().then(() => {
          this.navCtrl.pop();
          this.events.publish('ChangePayPasswordPage:editPaypwd');
        });
      }
    })
  }
}
