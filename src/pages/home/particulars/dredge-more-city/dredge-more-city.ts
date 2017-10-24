import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";
import { Native } from "../../../../providers/native";
/*
  Generated class for the DredgeMoreCity page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-dredge-more-city',
  templateUrl: 'dredge-more-city.html'
})
export class DredgeMoreCityPage {
  reginArr: any;
  formData = {
    region_ids: [],
    reason: null,
    phone: null,
    zhizhao: null,
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popover: PopoverController,
    public httpService: HttpService,
    public native: Native
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DredgeMoreCityPage');
  }
  ionViewCanEnter() {
    return this.getHttpData().then((res) => {
      return true;
    }, (res) => {
      this.native.showToast('没有未开通城市', null, false)
      return false;
    });
  }
  getHttpData() {
    return new Promise((resolve, reject) => {
      this.httpService.regionApply().then((res) => {
        if (res.no_user_citys.length == 0) { reject(); } else { resolve(); }
        if (res.status == 1) {
          this.reginArr = res;
        }
      })
    })

  }
  selectCity(item) {
    this.formData.region_ids = []
    if (item.selected) {
      this.formData.region_ids = []
      item.selected = false;
    } else {
      for (let i = 0; i < this.reginArr.no_user_citys.length; i++) {
        this.reginArr.no_user_citys[i].selected = false;
      }
      this.formData.region_ids.push(item.region_id);
      item.selected = true;
    }
    // console.log(this.formData.region_ids)
  }
  opanNative(type) {
    let popover = this.popover.create('PopoverContentPage');
    popover.onDidDismiss((imageData) => {
      if (imageData) {
        this.formData.zhizhao = 'data:image/jpeg;base64,' + imageData.image;
      }
    })
    popover.present();
  }
  onsubmit() {
    this.httpService.postRegionApply(this.formData).then((res) => {
      if (res.status == 1) {
        this.native.showToast(res.info);
        this.navCtrl.pop();
      }
    })
  }
}
