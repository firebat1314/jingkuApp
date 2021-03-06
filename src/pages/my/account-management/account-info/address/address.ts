import { Component } from '@angular/core';
import { NavController, NavParams, Events, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../../../providers/http-service";
import { Native } from "../../../../../providers/native";

/*
  Generated class for the Address page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html'
})
export class AddressPage {

  placeholder: any = this.navParams.get('data');
  userAddress: any = this.placeholder;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpServive: HttpService,
    public native: Native,
    public events: Events
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');
  }
  onsubmit() {
    this.httpServive.editProfile({ address: this.userAddress }).then((res) => {
      // console.log(res);
      if (res.status == 1) {
        this.native.showToast('修改成功');
        this.navCtrl.pop().catch(res => { history.back() });
        this.events.publish('userInfo:editOk');//编辑完成返回刷新页面
      }
    })
  }
}
