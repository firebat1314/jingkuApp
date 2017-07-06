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
  data: any;

  applyTabs: string = 'applyLog';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
  ) { }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RepairReturnPage');
    this.getOrderRepair();
  }
  getOrderRepair() {
    this.httpService.orderRepair().then((res) => {
      if (res.status == 1) {
        this.data = res;
      }
    })
  }
}
