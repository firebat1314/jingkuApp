import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Http } from "@angular/http";
import { Storage } from '@ionic/storage';
import { UserData } from "../../services/user-data";

import { SignupSecondPage } from '../signup-second/signup-second';
import { LoginPage } from '../login/login';


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
  private signupInfo: {
    username?: String,
    mobile_phone?: String,
    str_verify?: String
  } = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userData: UserData,
    private events: Events,
    public http: Http
  ) {
    this.getImg()
  }

  registerBtn() {
    let self = this;
    this.userData.signupFirst(this.signupInfo).subscribe(
      data => {
        console.log(data)
        this.navCtrl.push(SignupSecondPage);
        if (data.status == 1) {
          self.userData.setUsername(self.signupInfo.username);
          self.events.publish("user:signupFirst", self.signupInfo.username);
        }
      },
      error => {
        self.events.publish("user:signupFirst:error");
      }
    );
  }

  getImg() {
    this.userData.getVerificationImg({
      fontSize: '20',
      length: '6',
      useNoise: 'false',
      codeSet: '0'
    }).subscribe(
      data => {
        console.log(data)
        if (data.status == 200) {

        }
      },
      error => {
        console.log(error)
      }
      );
  }

  getMobileCode() {
    this.userData.getMobileCode({
      type: 'reg',
      mobile: this.signupInfo.mobile_phone,
      verify: this.signupInfo.str_verify
    }).subscribe(
      data => {
        console.log(data)
        if (data.status == 1) {

        }
      },
      error => {
        console.log(error)
      }
      )
  }

  toLoginPage(){
    this.navCtrl.push(LoginPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
