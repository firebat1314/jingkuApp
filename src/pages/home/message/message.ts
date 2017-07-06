import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";

/*
  Generated class for the Message page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {
  userTidings: any;
  wuLiuTidings: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpService
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
    this.getData();
  }
  goMessageDetailsPage(type) {
    this.navCtrl.push('MessageDetailsPage', { msgType: type })
  }
  getData() {
    this.httpService.getTidings({ istop: 1 }).then((res) => {
      if (res.status == 1) {
        this.userTidings = res;
      }
    })
    this.httpService.getWuLiuTidings({ istop: 1 }).then((res) => {
      if (res.status == 1) {
        this.wuLiuTidings = res;
      }
    })
  }
}
