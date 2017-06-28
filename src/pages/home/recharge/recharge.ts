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
  msg: any;
  payCode: any;
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
      console.log(this.payList)
      console.log(this.payList.data)
      console.log(this.payList.data[0])
      this.msg = this.payList.data[0].pay_desc;
    })
  }
  onSubmit(money, type) {
    this.httpService.addAccount({ amount: money, payment_id: 6 }).then((res) => {
      if (res.status == 1) {
        this.httpService.pay({ log_id: res.log_id, type: 'log' }).then((res) => {
          if (res.status == 1) {
            this.payCode = res;
            if (type == '微信支付') {
              this.getOrderInfo(this.payCode.weixin);
            } else if (type == '支付宝') {
              this.getOrderInfo(this.payCode.alipay);
            } else if (type == '银联支付') {
              this.getOrderInfo(this.payCode.upacp);
            } else if (type == "银行汇款/转账") {
              this.httpService.addAccount({ amount: money, payment_id: 4 }).then((res) => {
                if (res.status == 1) {
                  this.alertCtrl.create({
                    title: '汇款须知',
                    subTitle: this.msg,
                    buttons: [{
                      text: '个人中心',
                      handler: () => {
                        this.navCtrl.parent.select(3);
                        this.navCtrl.pop();
                      }
                    }, {
                      text: '确认'
                    }],
                    cssClass: 'recharge-alert'
                  }).present();
                }
              })
            }
          }
        })
      }
    })
  }
  getOrderInfo(data) {
    this.httpService.payCode({ code: data }).then((res) => {
      console.log(res);
      if ((res.status == 1)) {
        // this.wechatPay(res.pingxx)
        this.openPingPayment(res.pingxx);
      }
    })
  }
  openPingPayment(data) {
    let that = this;
    (<any>window).navigator.pingpp.requestPayment(data, (result, err) => {
      that.navCtrl.pop();
      if (result == 'success') {
        that.native.showToast("支付成功");
      } else if (result == 'cancel') {
        that.native.showToast("取消支付");
      }
      console.log('success', result, err)
      return;
    }, (result, err) => {
      if (result == 'cancel') {
        that.native.showToast("取消支付");
      } else {
        that.native.showToast("支付异常,请尝试其他支付方式");
      }
      console.log('fail', result, err)
    });
  }
}
