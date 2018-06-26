import { Component } from '@angular/core';
import { NavController, NavParams, Events, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";
import { Native } from "../../../../providers/native";

@IonicPage({
  segment:'add-shipping-address/:addId/:is_interim'
})
@Component({
  selector: 'page-add-shipping-address',
  templateUrl: 'add-shipping-address.html'
})
export class AddShippingAddressPage {
  default: any;
  cityData: any[]; //城市数据
  cityName: string = '请选择'; //初始化城市名
  code: string; //城市编码

  addressId = this.navParams.get('addId');
  is_interim = this.navParams.get('is_interim');//是否为临时地址
  
  formData = {
    address_id: '',
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
    public httpService: HttpService,
    public native: Native,
    public events: Events
  ) {
    
  }
  ngOnInit(){
    console.log('收货地址id==>', this.addressId);
    this.setCityPickerData();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddShippingAddressPage');
  }
  getAddressDetails() {
    if (this.addressId != undefined) {
      this.httpService.AddressDetail({ address_id: this.addressId }).then((res) => {
        if (res.status == 1) {
          this.formData = {
            address_id: this.addressId,
            consignee: res.address_info.consignee,
            province: res.address_info.province,
            city: res.address_info.city,
            district: res.address_info.district,
            address: res.address_info.address,
            mobile: res.address_info.mobile
          }
          this.default = res.default;
          this.cityName = this.getCityName(res.address_info.province, res.address_info.city, res.address_info.district)
        }
      })
    }
  }
  setCityPickerData() {
    this.httpService.FileJsonRegion().then(data => {
      this.cityData = JSON.parse(data.data);
      this.getAddressDetails();
    });
  }
  getCityName(province, city, district) {
    let arr = [];
    for (let p = 0; p < this.cityData.length; p++) {
      if (this.cityData[p].code == province) {
        arr.push(this.cityData[p].name);
      }
      for (let c = 0; c < this.cityData[p].children.length; c++) {
        if (this.cityData[p].children[c].code == city) {
          arr.push(this.cityData[p].children[c].name);
        }
        var items = this.cityData[p].children[c].children;
        if (items) {
          for (let d = 0; d < items.length; d++) {
            if (items[d].code == district) {
              arr.push(items[d].name);
            }
          }
        }
      }
    }
    return arr.join('-');
  }
  /**
   * 删除地址
   */
  deleteThis() {
    this.native.openAlertBox('确认删除？', () => {
      this.httpService.delAddress({ address_ids: [this.addressId] }).then((res) => {
        if (res.status == 1) {
          this.events.publish('updateAddress');
          this.navCtrl.pop().catch(res => { history.back() });
        }
      })
    })
  }
  onsubmit() {
    if (this.addressId != undefined) {
      this.httpService.editAddress(Object.assign(this.formData, { default: this.default?1 : 0,is_interim:this.is_interim>0?1:0 })).then((res) => {
        if (res.status == 1) {
          this.native.showToast(res.info)
          this.events.publish('updateAddress');
          this.navCtrl.pop().catch(res => { history.back() });
        }
      })
    } else {
      this.httpService.addAddress(Object.assign(this.formData, { default: this.default?1 : 0 ,is_interim:this.is_interim>0?1:0})).then((res) => {
        if (res.status == 1) {
          this.events.publish('updateAddress');
          this.navCtrl.pop().catch(res => { history.back() });
        }
      })
    }
  }
  /**
   * 城市选择器被改变时触发的事件
   * @param event
   */
  cityChange(event) {
    this.formData.city = event.city.value;
    this.formData.province = event.province.value;
    this.formData.district = event.region.value;
  }
}
