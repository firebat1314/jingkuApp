import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";

/*
  Generated class for the MemberCenter page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-member-center',
  templateUrl: 'member-center.html'
})
export class MemberCenterPage {
  userInfo: any;
  width: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService
  ) {
    this.httpService.userInfo().then((res) => {
      console.log(res)
      if (res.status == 1) {
        this.userInfo = res;
        this.width = res.data.user_info.pay_points / 10000000 * 100 + '%';
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberCenterPage');
  }

}
