import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";

/*
  Generated class for the AccountJifen page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-account-jifen',
  templateUrl: 'account-jifen.html'
})
export class AccountJifenPage {
  showBackTopBtn: boolean;
  data: any;
  number = this.navParams.get('number');

  @ViewChild(Content) content:Content;
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpService) {
  }
  ngOnInit(){
    this.getData();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountJifenPage');
  }
  getData() {
    this.httpService.accountLog({ account_type: 'pay_points', page: 1 }).then(res => {
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
  goIntegralstorePage() {
    this.navCtrl.push('IntegralstorePage');
  }
}
