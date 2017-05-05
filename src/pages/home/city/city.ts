import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";

/*
  Generated class for the City page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-city',
  templateUrl: 'city.html'
})
export class CityPage {
  data: any = this.navParams.get('areaList');
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpService,
    private native: Native,
    public events: Events
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CityPage');
  }


  switcher(region) {
    if (!region) {
      return false;
    }
    this.httpService.editArea({ id: region.region_id }).then((res) => {
      console.log(res);
      if (res.status == 1) {
        this.navCtrl.pop();
        this.events.publish('home:updataArea');
        this.native.showToast('切换至' + region.region_name);
      }
    })
  }
}
