import { Component } from '@angular/core';
import { NavController, NavParams, Events, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";
import { Native } from "../../../../providers/native";

/*
  Generated class for the ShippingAddress page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
   selector: 'page-shipping-address',
   templateUrl: 'shipping-address.html'
})
export class ShippingAddressPage {
   addressList: any;
   areaTypeSelect = 0;
   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public httpService: HttpService,
      public native: Native,
      public events: Events
   ) {
   }
   ngOnInit() {
      this.getHttpData();
      this.events.subscribe('updateAddress', (res) => {
         this.getHttpData()
      })
   }
   ionViewDidLoad() {
      console.log('ionViewDidLoad ShippingAddressPage');
   }
   getHttpData() {
      this.httpService.addressList({ type: this.areaTypeSelect }).then((res) => {
         // console.log('收货地址列表：', res)
         if (res.status == 1) { this.addressList = res }
      })
   }
   areaTypeChange() {
      this.getHttpData();
   }
   deleteOne(id) {
      this.native.openAlertBox('确认删除', () => {
         this.httpService.delAddress({ address_ids: [id] }).then((res) => {
            // console.log(res);
            if (res.status == 1) { this.getHttpData() }
         })
      })
   }
   setDefaultAddress(id) {
      this.httpService.defaultAddress({ address_id: id }).then((res) => {
         // console.log(res);
         this.getHttpData();
         if (res.status == 1) {
            this.native.showToast('更换成功')
         }
      })
   }
   ngOnDestroy() {
      this.events.unsubscribe('updateAddress');
   }
}
