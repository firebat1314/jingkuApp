import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JifenHistoryPage } from "./jifen-history/jifen-history";
import { DuihuanDetailsPage } from "./duihuan-details/duihuan-details";
import { DuihuanDetailsFinishPage } from "./duihuan-details-finish/duihuan-details-finish";
import { MemberCenterPage } from "../../my/account-management/member-center/member-center";

/*
  Generated class for the Integralstore page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-integralstore',
  templateUrl: 'integralstore.html'
})
export class IntegralstorePage {
  constructor(public navCtrl: NavController, public navParams: NavParams) { }
  JifenHistoryPage: any = JifenHistoryPage;
  DuihuanDetailsPage: any = DuihuanDetailsPage;
  DuihuanDetailsFinishPage: any = DuihuanDetailsFinishPage;
  MemberCenterPage: any = MemberCenterPage;
  ionViewDidLoad() {
    console.log('ionViewDidLoad IntegralstorePage');
  }
  goDuihuanDetailsPage(id){
    this.navCtrl.push(DuihuanDetailsPage,{id:id})
  }
  previousPage() {

  }
  nextPage() {

  }

}
