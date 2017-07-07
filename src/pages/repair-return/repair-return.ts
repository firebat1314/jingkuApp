import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../../providers/http-service";

/**
 * Generated class for the RepairReturnPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-repair-return',
  templateUrl: 'repair-return.html',
})
export class RepairReturnPage {
  list: Array<any> = [];

  applyTabs: string = 'apply' || 'applyLog';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
  ) { }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RepairReturnPage');
    this.getOrderRepair();
  }
  getOrderRepair(infiniteScroll?) {
    this.httpService.orderRepair({
      size: 1,
      page: 1
    }).then((res) => {
      if (res.status == 1) {
        this.list = this.list.concat(res.list);

        if (infiniteScroll) {
          setTimeout(() => {
            infiniteScroll.complete();
          }, 500);
        }

      }
    })
  }
  doRefresh(refresher) {
    this.list = [];
    this.getOrderRepair();

    setTimeout(() => {
      refresher.complete();
    }, 500);
  }
  doInfinite(infiniteScroll) {
    this.getOrderRepair(infiniteScroll);
  }
}
