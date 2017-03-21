import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";


/*
  Generated class for the AddShippingAddress page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-shipping-address',
  templateUrl: 'add-shipping-address.html'
})
export class AddShippingAddressPage {
  cityData: any[]; //城市数据
  cityName: string = '北京市 北京市 东城区'; //初始化城市名
  code: string; //城市编码
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService
  ) { 
    this.setCityPickerData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddShippingAddressPage');
  }
  setCityPickerData() {
    this.httpService.getCityJsonData().then(data => {
      this.cityData = data;
    });
  }
  /**
   * 城市选择器被改变时触发的事件
   * @param event
   */
  cityChange(event){
    console.log(event);
    this.code = event['region'].value
  }
}
