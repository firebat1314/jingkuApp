import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { HttpService } from "../../../../../providers/http-service";
import { Native } from "../../../../../providers/native";

/*
  Generated class for the Qq page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-qq',
  templateUrl: 'qq.html'
})
export class QqPage {
  placeholder: any = this.navParams.data;
  userqq: any = this.placeholder;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpServive: HttpService,
    public native: Native,
    public events: Events
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QqPage');
  }
  onsubmit() {
    this.httpServive.editProfile({ qq: this.userqq }).then((res) => {
      console.log(res);
      if (res.status == 1) {
        this.native.showToast('修改成功');
        this.navCtrl.pop();
        this.events.publish('userInfo:editOk');//编辑完成返回刷新页面
      }
    })
  }
}
