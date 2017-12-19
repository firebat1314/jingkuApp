import { Component } from '@angular/core';
import { NavController, NavParams, Events, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../../../providers/http-service";
import { Native } from "../../../../../providers/native";

/*
  Generated class for the Companyname page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage({
  segment:'companyname/:company'
})
@Component({
  selector: 'page-companyname',
  templateUrl: 'companyname.html'
})
export class CompanynamePage {

  placeholder: any = this.navParams.get('company');
  usercompany: any = this.placeholder;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpServive: HttpService,
    public native: Native,
    public events: Events
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanynamePage');
  }
  onsubmit() {
    this.httpServive.editProfile({ company: this.usercompany }).then((res) => {
      // console.log(res);
      if (res.status == 1) {
        this.native.showToast('修改成功');
        this.navCtrl.pop();
        this.events.publish('userInfo:editOk');
      }
    })
  }

}
