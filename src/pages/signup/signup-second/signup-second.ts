import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../../login/login';
import { SignupThirdPage } from '../signup-third/signup-third';
import { HttpService } from "../../../providers/http-service";

/*
  Generated class for the SignupSecond page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup-second',
  templateUrl: 'signup-second.html'
})
export class SignupSecondPage {
  formData = {
    true_name: '',
    qq: '',
    company: '',
    province: '',
    city: '',
    district: '',
    zhizhao: ''
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService
  ) {
    this.httpService.changeRegion().then((res) => {
      console.log(res);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupSecondPage');
  }

  toLoginPage() {
    this.navCtrl.push(LoginPage)
  }

  toThirdPage() {
    this.httpService.signupTwo(this.formData).then((res) => {
      console.log(res)
      if (res.status == 1) {
        this.navCtrl.push(SignupThirdPage);
      }
    })
  }
}
