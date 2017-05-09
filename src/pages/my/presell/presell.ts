import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";

@Component({
  selector: 'page-presell',
  templateUrl: 'presell.html'
})
export class PresellPage {
  data: any;
  getCategorys: any;

  checkedIndex: number = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpService
  ) {
    this.httpService.getCategorys().then((res) => {
      if (res.status == 1) { this.getCategorys = res.data; }
    })
    this.getPresell();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PresellPage');
  }
  getList(index) {
    this.checkedIndex = index;
    let id = this.getCategorys[index].cat_id;
    this.getPresell(id);
  }
  getPresell(id = 1) {
    this.httpService.presell({ cat_id: id }).then((res) => {
      if (res.status == 1) {
        this.data = res;
      }
    })
  }
}
