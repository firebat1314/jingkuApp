import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";
import { Native } from "../../../../providers/native";
import { ShippingAddressPage } from "../shipping-address/shipping-address";


@Component({
  selector: 'page-add-shipping-address',
  templateUrl: 'add-shipping-address.html'
})
export class AddShippingAddressPage {
  default: any;
  cityData: any[]; //城市数据
  cityName: string = '北京市-北京市-东城区'; //初始化城市名
  code: string; //城市编码

  addressId = this.navParams.get('addId');

  formData = {
    address_id: '',
    consignee: '1',
    province: '1',
    city: '1',
    district: '1',
    address: '1',
    mobile: '13100668641'
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public native: Native,
    public events: Events
  ) {
    console.log('收货地址id==>', this.addressId);
    this.setCityPickerData();
    this.getAddressDetails();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddShippingAddressPage');
  }
  getAddressDetails() {
    if (this.addressId != undefined) {
      this.httpService.AddressDetail({ address_id: this.addressId }).then((res) => {
        console.log(res);
        if (res.status == 1) {
          this.formData = {
            address_id: this.addressId,
            consignee: res.address_info.consignee,
            province: res.address_info.province,
            city: res.address_info.city,
            district: res.address_info.district,
            address: res.address_info.address,
            mobile: res.address_info.mobile,
          }
        }
      })
    }
  }
  setCityPickerData() {
    this.httpService.getCityJsonData().then(data => {
      this.cityData = data;
    });
  }
  /**
   * 删除地址
   */
  deleteThis() {
    this.native.openAlertBox('确认删除？', () => {
      this.httpService.delAddress({ address_ids: [this.addressId] }).then((res) => {
        console.log("删除收货地址==>", res)
        if (res.status == 1) {
          this.events.publish('updateAddress');
          this.navCtrl.pop();
        }
      })
    })
  }
  onsubmit() {
    if (this.addressId != undefined) {
      this.httpService.editAddress(this.formData).then((res) => {
        console.log(res);
        if (res.status == 1) {
          this.events.publish('updateAddress');
          this.navCtrl.pop();
        }
      })
    } else {
      this.default ? this.default = '1' : this.default = '0';
      this.httpService.addAddress(Object.assign(this.formData, { default: this.default })).then((res) => {
        console.log(res);
        if (res.status == 1) {
          this.events.publish('updateAddress');
          this.navCtrl.pop();
        }
      })
    }
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
