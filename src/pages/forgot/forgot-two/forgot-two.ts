import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ForgotTwo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forgot-two',
  templateUrl: 'forgot-two.html'
})
export class ForgotTwoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotTwoPage');
  }
  private wait: number = 60;
  private disabled: Boolean = false;
  private value: String = '发送验证码';
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
      setTimeout(function () {
        self.wait--;
        self.time();
      }, 1000)
    }
  }
}
