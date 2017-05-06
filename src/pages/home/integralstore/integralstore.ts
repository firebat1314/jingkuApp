import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { JifenHistoryPage } from "./jifen-history/jifen-history";
import { DuihuanDetailsPage } from "./duihuan-details/duihuan-details";
import { DuihuanDetailsFinishPage } from "./duihuan-details-finish/duihuan-details-finish";
import { MemberCenterPage } from "../../my/account-management/member-center/member-center";
import { HttpService } from "../../../providers/http-service";

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
  totalScore: any;
  data: any;
  @ViewChild(Content) content: Content;


  JifenHistoryPage: any = JifenHistoryPage;
  DuihuanDetailsPage: any = DuihuanDetailsPage;
  DuihuanDetailsFinishPage: any = DuihuanDetailsFinishPage;
  MemberCenterPage: any = MemberCenterPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService
  ) {
    this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntegralstorePage');
  }
  goDuihuanDetailsPage(id) {
    this.navCtrl.push(DuihuanDetailsPage, { id: id })
  }
  getData() {
    this.httpService.exchange({ page: 1 }).then((res) => {
      console.log(res);
      if (res.status == 1) { this.data = res; }
    })
    this.httpService.userInfo().then((res) => {
      console.log('（2）获取用户资料☞', res)
      if (res.status == 1) { this.totalScore = res.data.integral; }
    })
  }

  flag: boolean = true;
  doInfinite(infiniteScroll) {
    if (this.data.page < this.data.pages) {
      this.data.page++;
    } else {
      this.flag = false;
      return;
    }
    this.httpService.exchange({ page: this.data.page }).then((res) => {
      console.log(res);
      if (res.status == 1) {
        Array.prototype.push.apply(this.data.list, res.list);
      }
      setTimeout(() => {
        infiniteScroll.complete();
      }, 500);
    })
  }
  scrollToTop() {
    this.content.scrollToTop();
  }
}
