import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../../../providers/http-service";

/**
 * Generated class for the GoodslistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-goodslist',
  templateUrl: 'goodslist.html',
})
export class GoodslistPage {
  data: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
  ) {
    this.getList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoodslistPage');
  }

  getList() {
    this.httpService.checkout().then((res) => {
      this.data = res;
    })
  }

}
