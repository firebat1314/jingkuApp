import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../../../providers/http-service";
import { Native } from "../../../../../providers/native";

/*
  Generated class for the OrderModalShipping page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-order-modal-shipping',
  templateUrl: 'order-modal-shipping.html'
})
export class OrderModalShippingPage {
  data: any;
  callBack: any = this.navParams.get('callBack')
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public httpService: HttpService,
    private events: Events,
    private native: Native
  ) {
    this.getHttpData();
    this.events.subscribe('updateAddress', () => {
      this.getHttpData();
      this.events.publish('writeOrder:refresh');
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderModalShippingPage');
  }
  ngOnDestroy() {
    this.events.unsubscribe('updateAddress');
  }
  getHttpData() {
    this.httpService.checkout().then((res) => {
      // console.log(res);
      if (res && res.status == 1) {
        this.data = res.consignee_list;
        if (!res.consignee_list.length) {
          this.native.openAlertBox('是否添加收货地址？', () => {
            this.navCtrl.push('AddShippingAddressPage');
          },()=>{
            this.navCtrl.pop();
          })
        }
      }
    })
  }
  dismiss(data?: any) {
    if (data.is_show == 0) {
      this.native.openAlertBox('不在可配送城市,是否切换城市？', () => {
        this.navCtrl.push('CityPage');
      })
      return;
    }
    this.httpService.changeConsignee({ address_id: data.address_id }).then((res) => {
      // console.log(res);
      if (res.status == 1) {
        this.native.showToast('已切换收货地址')
        this.viewCtrl.dismiss(data);
        this.callBack(data).then((res) => {
          // this.navCtrl.pop();
          this.events.publish('writeOrder:refresh');
          // console.log(res)
        }, (err) => {
          // console.log(err)
        })
      }
    })
  }
  goEditAddress(addId) {
    this.navCtrl.push('AddShippingAddressPage', { addId: addId })
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
    this.navCtrl.push('AddShippingAddressPage');
  }
}
