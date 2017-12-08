import { Component } from '@angular/core';
import { NavController, NavParams, Events, IonicPage } from 'ionic-angular';
// import { LoginPage } from '../../login/login';

/*
  Generated class for the SignupThird page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-signup-third',
  templateUrl: 'signup-third.html'
})
export class SignupThirdPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events
  ) {
   
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupThirdPage');
    this.time()
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
  toLogin() {
    this.navCtrl.goToRoot({animate:true});
  }
  ngOnDestroy() {
    clearTimeout(this.timer);
  }
}
