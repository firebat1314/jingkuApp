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
  addressId;
  addressDetails;

  formData = {
    address_ids: '',
    consignee: '',
    province: '',
    city: '',
    district: '',
    address: '',
    mobile: ''
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService
  ) {
    this.addressId = this.navParams.get('addId');
    this.setCityPickerData();
    this.getAddressDetails()

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddShippingAddressPage');
  }
  getAddressDetails() {
    this.httpService.AddressDetail({ address_id: this.addressId }).then((res) => {
      console.log(res);
      if (res.status == 1) { this.addressDetails = res }
    })
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
  cityChange(event) {
    console.log(event);
    this.code = event['region'].value
  }
}
