import { Component } from '@angular/core';
import { NavController, NavParams, Events, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../../../providers/http-service";
import { Native } from "../../../../../providers/native";

/*
  Generated class for the Realname page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage({
  segment:"realname/:true_name"
})
@Component({
  selector: 'page-realname',
  templateUrl: 'realname.html'
})
export class RealnamePage {
  placeholder = this.navParams.get('true_name');
  username: any = this.placeholder;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpServive: HttpService,
    public native: Native,
    public events: Events
  ) {  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RealnamePage');
  }
  onsubmit() {
    this.httpServive.editProfile({ true_name: this.username }).then((res) => {
      // console.log(res);
      if (res.status == 1) {
        this.native.showToast('修改成功');
        this.navCtrl.pop();
        this.events.publish('userInfo:editOk');
      }
    })
  }
}
