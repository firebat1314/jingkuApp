import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events, IonicPage } from 'ionic-angular';

// import { CityPage } from "../../city/city"
import { HttpService } from "../../../../providers/http-service";
import { Native } from "../../../../providers/native";
/*
  Generated class for the ParticularsModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-particulars-modal',
  templateUrl: 'particulars-modal.html'
})
export class ParticularsModalPage {
  title = this.navParams.get('name');
  getBonus = this.navParams.get('getBonus');
  sendto = this.navParams.get('sendto');;
  GoodsInfo = this.navParams.get('GoodsInfo');
  promotion = this.navParams.get('promotion');
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public httpService: HttpService,
    public events: Events,
    public native: Native
  ) { }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ParticularsModalPage');
  }
  ngAfterViewInit() {
  }
  dredgeMoreCity() {
    this.dismiss('goDredgeMoreCityPage');
  }
  getPrivilege(item, event) {
    if (item.is_get == 1) {
      this.native.showToast('已经领取过了哦');
    } else if (item.is_get == 0) {
      this.httpService.sendByUser({ type_id: item.type_id }).then((res) => {
        if (res.status) {
          this.native.showToast('领取成功');
          this.getBonus[event].is_get = 1;
        }
      });
    }
  }
  setArea(ids) {
    console.log(ids)
    this.httpService.setArea({
      goods_id: this.GoodsInfo.goods_id,
      gaid: ids.gaid ? ids.gaid : '',
      region_id: ids.region_id
    }).then((res) => {
      if (res.status == 1) {
        this.viewCtrl.dismiss({ region_name: ids.region_name });
        this.native.showToast('切换成功');
      }
    })
  }
  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }

}
