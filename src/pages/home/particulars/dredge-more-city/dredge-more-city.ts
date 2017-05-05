import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';


import { PopoverContentPage } from "./popover-content/popover-content"
import { HttpService } from "../../../../providers/http-service";
/*
  Generated class for the DredgeMoreCity page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dredge-more-city',
  templateUrl: 'dredge-more-city.html'
})
export class DredgeMoreCityPage {
  reginArr: any;
  private image1;
  private image2;

  formData = {
    region_ids: [],
    reason: '',
    phone: '',
    frdb_code_zm: '',
    frdb_code_fm: ''
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popover: PopoverController,
    public httpService: HttpService
  ) {
    this.getHttpData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DredgeMoreCityPage');
  }
  getHttpData() {
    this.httpService.regionApply().then((res) => {
      console.log(res);
      if (res.status == 1) {
        this.reginArr = res;
      }
    })
  }
  selectCity(item) {
    let arr = this.formData.region_ids
    let index = arr.indexOf(item.region_id)
    if (index == -1) {
      arr.push(item.region_id);
      item.selected = true;
    } else {
      arr.splice(index, 1);
      item.selected = false;
    }
  }
  opanNative(type) {
    let popover = this.popover.create(PopoverContentPage);
    popover.onDidDismiss((imageData) => {
      if (imageData) {
        console.log(imageData)
        if (type == 0) {//正面身份照
          this.formData.frdb_code_zm = 'data:image/jpeg;base64,' + imageData.image;
        } else {//反面身份照
          this.formData.frdb_code_fm = 'data:image/jpeg;base64,' + imageData.image;
        }
      }
    })
    popover.present();
  }
  onsubmit() {
    console.log(this.formData)
    this.httpService.postRegionApply(this.formData).then((res) => {
      console.log(res);
      if (res.status == 1) {
      }
    })
  }
}
