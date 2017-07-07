import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";

/**
 * Generated class for the RepairApplyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-repair-apply',
  templateUrl: 'repair-apply.html',
})
export class RepairApplyPage {
  data: any;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
  ) {
    this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepairApplyPage');
  }
  getData() {
    this.httpService.repairApply().then((res) => {
      if (res.status == 1) {
        this.data = res;
      }
    })
  }
}
