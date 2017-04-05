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
  cityData: any[]; //城市数据
  cityName: string = '北京市 北京市 东城区'; //初始化城市名
  code: string; //城市编码
  addressId;
  addressDetails;

  formData = {
    address_ids: '1',
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
    this.addressId = this.navParams.get('addId');
    console.log('收货地址id==>', this.addressId);
    this.setCityPickerData();
    if (this.addressId != undefined) {
      this.getAddressDetails();
    }
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
      this.httpService.editAddress().then((res) => {
        console.log(res);
        if (res.status == 1) {
          this.events.publish('updateAddress');
          this.navCtrl.pop();
        }
      })
    } else {
      this.httpService.addAddress(this.formData).then((res) => {
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
