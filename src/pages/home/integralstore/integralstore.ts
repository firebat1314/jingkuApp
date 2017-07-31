import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, IonicPage, FabButton } from 'ionic-angular';

import { HttpService } from "../../../providers/http-service";

/*
  Generated class for the Integralstore page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-integralstore',
  templateUrl: 'integralstore.html'
})
export class IntegralstorePage {
  totalScore: any;
  data: any;
  @ViewChild(Content) content: Content;
  @ViewChild('scrollToTop') fabButton: FabButton;
  JifenHistoryPage: any = 'JifenHistoryPage';
  DuihuanDetailsPage: any = 'DuihuanDetailsPage';
  DuihuanDetailsFinishPage: any = 'DuihuanDetailsFinishPage';
  MemberCenterPage: any = 'MemberCenterPage';

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
  goDuihuanDetailsPage(goodsId) {
    this.navCtrl.push('DuihuanDetailsPage', { goodsId: goodsId })
  }
  ionViewWillEnter() {

  }
  getData() {
    return new Promise((resolve, reject) => {
      this.httpService.exchange({ page: 1 }).then((res) => {
        if (res.status == 1) { this.data = res; }
      })
      this.httpService.userInfo().then((res) => {
        if (res.status == 1) { this.totalScore = res.data.integral; }
        resolve()
      })
    })
  }
  ngAfterViewInit() {
    /* 回到顶部按钮 */
    this.fabButton.setElementClass('fab-button-out', true);
    this.content.ionScroll.subscribe((d) => {
      this.fabButton.setElementClass("fab-button-in", d.scrollTop >= d.contentHeight);
    });
  }
  doInfinite(infiniteScroll) {
    var page = this.data.page;
    if (page < this.data.pages) {
      this.httpService.exchange({ page: ++page }).then((res) => {
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
