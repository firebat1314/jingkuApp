import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";

/*
  Generated class for the MessageDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-message-details',
  templateUrl: 'message-details.html'
})
export class MessageDetailsPage {
  wuLiuTidings: any;
  userTidings: any;
  type = this.navParams.get('msgType');
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpService

  ) {
    this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageDetailsPage');
  }
  getData() {
    if (this.type == 1) {
      this.httpService.getWuLiuTidings().then((res) => {
        if (res.status == 1) {
          this.wuLiuTidings = res;
        }
      })
    }
    if (this.type == 2) {
      this.httpService.getTidings().then((res) => {
        if (res.status == 1) {
          this.userTidings = res;
        }
      })
    }
  }
  page1: any = 1;
  page2: any = 1;
  infiniteFlag: boolean = true;
  doInfinite1(infiniteScroll) {
    this.page1++;
    this.httpService.getWuLiuTidings({ page: this.page1 }).then((res) => {
      if (res.status == 1) {
        Array.prototype.push.apply(this.wuLiuTidings.list, res.list);
      }
      setTimeout(() => {
        infiniteScroll.complete();
      }, 500);
    })

  }
  doInfinite2(infiniteScroll) {
    this.page2++;
    this.httpService.getTidings({ page: this.page2 }).then((res) => {
      if (res.status == 1) {
        Array.prototype.push.apply(this.userTidings.list, res.list);
      }
      setTimeout(() => {
        infiniteScroll.complete();
      }, 500);
    })
  }
}
