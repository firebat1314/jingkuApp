import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { PaymentMethodPage } from "../../my/all-orders/payment-method/payment-method";
import { Native } from "../../../providers/native";

/*
  Generated class for the Recharge page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recharge',
  templateUrl: 'recharge.html'
})
export class RechargePage {
  payList: any;
  payListImg: Array<any> = ['./assets/images/images/tchu1.jpg', './assets/images/images/tchu2.jpg']
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public native: Native,
    private alertCtrl: AlertController
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RechargePage');
    this.getAccountPayList();
  }
  ngAfterViewInit() {
  }
  getAccountPayList() {
    this.httpService.getAccountPayList().then((res) => {
      this.payList = res;
    })
  }
  onClick(money, payMethod) {
    if (payMethod == undefined) {
      this.native.showToast('请选择一种支付方式');
      return;
    }
    if (payMethod == 6) {
      this.httpService.addAccount({ amount: money, payment_id: payMethod }).then((res) => {
        if (res.status == 1) {
          this.httpService.pay({ log_id: res.log_id, type: 'log' }).then((res) => {
            if (res.status == 1) {
              this.navCtrl.push(PaymentMethodPage, { data: res })
            }
          })
        }
      })
    } else if (payMethod == 4) {
      this.httpService.addAccount({ amount: money, payment_id: payMethod }).then((res) => {
        if (res.status == 1) {
          this.alertCtrl.create({
            title: '汇款须知',
            subTitle: this.payList.data[2].pay_desc,
            buttons: [{
              text: '确认',
              handler: () => {
                this.navCtrl.parent.select(3);
                this.navCtrl.pop();
              }
            }],
            cssClass: 'recharge-alert'
          }).present();
        }
      })
    }
  }
}
