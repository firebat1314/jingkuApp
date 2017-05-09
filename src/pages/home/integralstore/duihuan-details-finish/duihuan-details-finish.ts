import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";

/*
  Generated class for the DuihuanDetailsFinish page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-duihuan-details-finish',
  templateUrl: 'duihuan-details-finish.html'
})
export class DuihuanDetailsFinishPage {
  data: any;
  item: any = this.navParams.get('item');

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService
  ) {
    this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DuihuanDetailsFinishPage');
  }
  goIntegralstorePage() {
    this.navCtrl.popTo(this.navCtrl.getByIndex(1));
  }
  getData() {
    this.httpService.exchangeGoodsInfo({ order_id: this.item.order_id }).then((res) => {
      if (res.status == 1) {
        this.data = res;
      }
    })
  }
}
