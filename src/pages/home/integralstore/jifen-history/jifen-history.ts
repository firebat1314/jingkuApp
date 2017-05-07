import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { DuihuanDetailsFinishPage } from "../duihuan-details-finish/duihuan-details-finish";
import { HttpService } from "../../../../providers/http-service";

/*
  Generated class for the JifenHistory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-jifen-history',
  templateUrl: 'jifen-history.html'
})
export class JifenHistoryPage {
  data: any;

  @ViewChild(Content) content: Content

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService
  ) {
    this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JifenHistoryPage');
  }

  goDuihuanDetailsFinishPage(item) {
    this.navCtrl.push(DuihuanDetailsFinishPage, { item: item })
  }

  getData() {
    this.httpService.accountLog({ account_type: 'pay_points', page: 1 }).then(res => {
      console.log(res);
      if (res.status == 1) {
        this.data = res;
      }
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
    this.httpService.accountLog({ account_type: 'pay_points', page: this.data.page }).then((res) => {
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
