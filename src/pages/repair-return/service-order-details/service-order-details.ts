import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";

/**
 * Generated class for the ServiceOrderDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-service-order-details',
  templateUrl: 'service-order-details.html',
})
export class ServiceOrderDetailsPage {
  data: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
  ) {
  }
  ngOnInit() {
    this.getData();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceOrderDetailsPage');
  }
  getData() {
    this.httpService.repairInfo().then((res) => {
      if (res.status == 1) {
        this.data = res;
      }
    })
  }
}
