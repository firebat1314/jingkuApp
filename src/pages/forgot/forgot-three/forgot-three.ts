import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from "../../login/login";

/*
  Generated class for the ForgotThree page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forgot-three',
  templateUrl: 'forgot-three.html'
})
export class ForgotThreePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { 
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotThreePage');
    this.time();
  }
  private wait: number = 3;
  private timer = null;
  private time() {
    if (this.wait == 0) {
      this.toLogin();
      this.wait = 3;
      return
    } else {
      let self = this;
      this.timer = setTimeout(function () {
        self.wait--;
        self.time();
      }, 1000)
    }
  }
  toLogin(){
      this.navCtrl.popToRoot();
  }
  ngOnDestroy(){
    clearTimeout(this.timer);
  }
}
