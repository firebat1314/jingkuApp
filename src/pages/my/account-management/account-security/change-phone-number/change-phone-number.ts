import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ChangePhoneNumber page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-change-phone-number',
  templateUrl: 'change-phone-number.html'
})
export class ChangePhoneNumberPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePhoneNumberPage');
  }
  private wait: number = 60;
  private disabled: Boolean = false;
  private value: String = '发送验证码';
  private timer: any;
  private time() {
    if (this.wait == 0) {
      this.disabled = false;
      this.value = "发送验证码";
      this.wait = 60;
      clearInterval(this.timer);
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
  getImg(){
    
  }
  changePhoneNumber(changePhoneNumber){
    console.log(changePhoneNumber)
  }
  ngOnDestroy(){
    clearInterval(this.timer);
  }
}
