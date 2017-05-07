import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";

/*
  Generated class for the Fastbuy page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-fastbuy',
  templateUrl: 'fastbuy.html'
})
export class FastbuyPage {
  data: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService
  ) {
    this.getData()
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FastbuyPage');
  }

  getData() {
    this.httpService.presell({ type: 'is_promote' }).then((res) => {
      console.log(res);
      if (res.status == 1) {
        this.data = res;
      }
    })
  }
}
