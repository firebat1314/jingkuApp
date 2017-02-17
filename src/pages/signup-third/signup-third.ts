import { Component } from '@angular/core';
import { NavController, NavParams,Events } from 'ionic-angular';
import { LoginPage } from '../login/login';

/*
  Generated class for the SignupThird page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup-third',
  templateUrl: 'signup-third.html'
})
export class SignupThirdPage {
  private username:String;
  constructor(
    public navCtrl: NavController,
   public navParams: NavParams,
   private events:Events
   ) {
     this.events.subscribe("user:signupFirst", (userEventData) => {
        this.username = userEventData;
        console.log(userEventData)
    })
    this.time()
   }
  private wait: number = 3;
  private time() {
    if (this.wait == 0) {
      this.toLogin()
      this.wait = 3;
      return
    } else {
      let self = this;
      setTimeout(function () {
        self.wait--;
        self.time();
      }, 1000)
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupThirdPage');
  }
  toLogin(){
    this.navCtrl.push(LoginPage,{
      username:this.username
    })
  }

}
