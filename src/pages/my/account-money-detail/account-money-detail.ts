import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";

/*
  Generated class for the AccountMoneyDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-account-money-detail',
  templateUrl: 'account-money-detail.html'
})
export class AccountMoneyDetailPage {
  data: any;
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpService) {
    this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountMoneyDetailPage');
  }

  getData() {
    this.httpService.accountLog({ page: 1 }).then((res) => {
      this.data = res;
    })
  }
  
  flag: boolean = true;
  doInfinite(infiniteScroll) {
    if (this.data.page < this.data.pages) {
      this.httpService.accountLog({ page: ++this.data.page }).then((res) => {
        if (res.status == 1) {
          Array.prototype.push.apply(this.data.list, res.list);
        }
        setTimeout(() => {
          infiniteScroll.complete();
        }, 500);
      })
    } else {
      this.flag = false;
    }
  }
  scrollToTop() {
    this.content.scrollToTop();
  }
}
