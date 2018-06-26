import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../../../providers/http-service";
import { Native } from "../../../../../providers/native";

/*
  Generated class for the OrderModalShipping page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage({
   segment: 'order-modal-shipping/:dId'
})
@Component({
   selector: 'page-order-modal-shipping',
   templateUrl: 'order-modal-shipping.html'
})
export class OrderModalShippingPage {
   data: any;
   callBack: any = this.navParams.get('callBack');
   dId: any = this.navParams.get('dId');
   areaTypeSelect = 0;
   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public viewCtrl: ViewController,
      public httpService: HttpService,
      private events: Events,
      private native: Native
   ) {

   }
   ionViewDidLoad() {
      console.log('ionViewDidLoad OrderModalShippingPage');
   }
   ngOnInit() {
      this.getHttpData();
      this.events.subscribe('updateAddress', () => {
         this.getHttpData();
         this.events.publish('writeOrder:refresh');
      });
   }
   ngOnDestroy() {
      this.events.unsubscribe('updateAddress');
   }
   getHttpData() {
      if (this.dId > 0) {
         this.httpService.checkout_d({ id: this.dId }).then((res) => {
            if (res && res.status == 1) {
               this.data = res;
               if (!res.consignee_list.length) {
                  this.native.openAlertBox('是否添加收货地址？', () => {
                     this.navCtrl.push('AddShippingAddressPage');
                  }, () => {
                     this.navCtrl.pop().catch(res => { history.back() });
                  })
               }
            }
         })
      } else {
         this.httpService.checkout().then((res) => {
            if (res && res.status == 1) {
               this.data = res;
               this.areaTypeSelect = res.is_interim > 0 ? 1 : 0;
               if (!res.consignee_list.length) {
                  this.native.openAlertBox('是否添加收货地址？', () => {
                     this.navCtrl.push('AddShippingAddressPage');
                  }, () => {
                     this.navCtrl.pop().catch(res => { history.back() });
                  })
               }
            }
         })
      }
   }
   areaTypeChange() {

   }
   dismiss(data?: any) {
      if (data.is_show == 0) {
         return this.native.openAlertBox('不在可配送城市,是否切换城市？', () => {
            this.navCtrl.push('CityPage');
         }, null, () => {
            this.getHttpData();
         });
      }
      if (this.dId > 0) {
         this.httpService.change_consignee_d({ address_id: data.address_id, id: this.dId }).then((res) => {
            if (res.status == 1) {
               this.native.showToast('地址切换成功')
               this.navCtrl.pop().then(() => {
                  this.events.publish('writeOrder:refresh');
               }).catch(() => { history.back() });
               /* this.callBack(data).then((res) => {
                  this.events.publish('writeOrder:refresh');
               }, (err) => {
               }) */
            }
         })
      } else {
         this.httpService.changeConsignee({ address_id: data.address_id, type: this.areaTypeSelect }).then((res) => {
            // console.log(res);
            if (res.status == 1) {
               this.native.showToast('地址切换成功')
               this.navCtrl.pop().then(() => {
                  this.events.publish('writeOrder:refresh');
               }).catch(() => { history.back() });
               /* this.callBack(data).then((res) => {
                  this.events.publish('writeOrder:refresh');
               }, (err) => {
               }) */
            }
         })
      }
   }
   goEditAddress(addId) {
      this.navCtrl.push('AddShippingAddressPage', { addId: addId, is_interim: this.areaTypeSelect })
   }
   delete(addId) {
      this.native.openAlertBox('确认删除？', () => {
         this.httpService.delAddress({ address_ids: [addId] }).then((res) => {
            // console.log("删除收货地址==>", res)
            if (res.status == 1) {
               this.getHttpData();
               this.events.publish('writeOrder:refresh');
               this.native.showToast('成功删除')
            }
         })
      })
   }
   goAddShippingAddressPage() {
      this.navCtrl.push('AddShippingAddressPage', { is_interim: this.areaTypeSelect });
   }
}
