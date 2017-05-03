import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

// import { CityPage } from "../../city/city"
import { DredgeMoreCityPage } from '../dredge-more-city/dredge-more-city'
import { HttpService } from "../../../../providers/http-service";
import { Native } from "../../../../providers/native";
/*
  Generated class for the ParticularsModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-particulars-modal',
  templateUrl: 'particulars-modal.html'
})
export class ParticularsModalPage {
  value: number;
  title = this.navParams.get('name');
  getBonus = this.navParams.get('getBonus');
  sendto = this.navParams.get('sendto');
  GoodsInfo = this.navParams.get('GoodsInfo');
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public httpService: HttpService,
    public native: Native
  ) { }
  ngOnInit() { }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ParticularsModalPage');
  }
  numberIChange(value: number) {
    this.value = value;
  }
  dredgeMoreCity() {
    this.navCtrl.push(DredgeMoreCityPage)
    this.dismiss();
  }
  getPrivilege(is_get, type_id) {
    if (is_get == 1) {
      this.native.showToast('已经领取过了');
    } else if (is_get == 0) {
      this.httpService.sendByUser({ type_id: type_id }).then((res) => {
        console.log("领取优惠券", res);
        this.native.showToast('领取优惠券成功')
        this.sendto.is_get = 0;
      });
    }
  }
  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }
  
}
