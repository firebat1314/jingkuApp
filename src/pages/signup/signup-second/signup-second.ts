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
  file: File;
  provinceList: any;
  cityList: any;
  districtList: any;
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
    this.httpService.changeRegion({ type: 1, parent_id: 1 }).then((res) => {
      console.log(res);
      this.provinceList = res.data;
    })
  }
  provinceChange(id) {
    this.httpService.changeRegion({ type: 2, parent_id: id }).then((res) => {
      console.log(res);
      if (res.status == 1) {
        this.cityList = res.data;
        this.formData.city = '';
        this.formData.district = '';
      }
    })
  }
  cityChange(id) {
    this.httpService.changeRegion({ type: 3, parent_id: id }).then((res) => {
      console.log(res);
      if (res.status == 1) {
        this.districtList = res.data;
      }
    })
  }
  onFileChange(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];
    console.log(this.file);
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
