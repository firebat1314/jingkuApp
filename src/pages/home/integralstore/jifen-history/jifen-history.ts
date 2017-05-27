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
    this.httpService.exchangeGoods({ page: 1 }).then(res => {
      console.log(res);
      if (res.status == 1) {
        this.data = res;
      }
    })
  }

  doInfinite(infiniteScroll) {
    var page = this.data.page;
    if (page < this.data.pages) {
      this.httpService.exchangeGoods({ page: ++page }).then((res) => {
        if (res.status == 1) {
          this.data.page = res.page;
          Array.prototype.push.apply(this.data.list, res.list);
        }
        setTimeout(() => {
          infiniteScroll.complete();
        }, 500);
      })
    } else {
      infiniteScroll.enable(false);
    }
  }
  scrollToTop() {
    this.content.scrollToTop();
  }
}
