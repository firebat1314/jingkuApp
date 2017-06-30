import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";
import { Native } from "../../../../providers/native";
// import { AllOrdersPage } from "../all-orders";

/*
  Generated class for the PaymentMethod page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var pingpp: any;
declare var Pingpp: any;
declare var Wechat: any;
declare var navigator: any;
@Component({
  selector: 'page-payment-method',
  templateUrl: 'payment-method.html'
})
export class PaymentMethodPage {

  payResult: any;
  data = this.navParams.get('data');

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public httpService: HttpService,
    public native: Native
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentMethodPage');
    // this.navCtrl.remove(this.navCtrl.indexOf(this.navCtrl.getPrevious(this.navCtrl.last())),1);
  }
  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }
  toPay(type) {
    if (type == 1) {
      this.httpService.payCode({ code: this.data.alipay }).then((res) => {
        console.log(res);
        if (res.status == 1 && pingpp) {
          console.log(pingpp)
          pingpp.createPayment(res.pingxx, function(result, err) {
            console.log(result, err)
            if (result == "success") {
              // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
 
            } else if (result == "fail") {
              // charge 不正确或者微信公众账号支付失败时会在此处返回
            } else if (result == "cancel") {
              // 微信公众账号支付取消支付
            }
          });
        }
      })
    } else if (type == 2) {
      this.httpService.payCode({ code: this.data.upacp }).then((res) => {
        console.log(res);
        if (res.status == 1 && pingpp) {
          console.log(pingpp)
          pingpp.createPayment(res.pingxx, function(result, err) {
            console.log(result, err)
            if (result == "success") {
              // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
 
            } else if (result == "fail") {
              // charge 不正确或者微信公众账号支付失败时会在此处返回
            } else if (result == "cancel") {
              // 微信公众账号支付取消支付
            }
          });
        }
      })
    } else if (type == 3) {
      this.httpService.payCode({ code: this.data.WeChat }).then((res) => {
        console.log(res);
        if (res.status == 1 && pingpp) {
          console.log(pingpp)
          pingpp.createPayment(res.pingxx, function(result, err) {
            console.log(result, err)
            if (result == "success") {
              // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
 
            } else if (result == "fail") {
              // charge 不正确或者微信公众账号支付失败时会在此处返回
            } else if (result == "cancel") {
              // 微信公众账号支付取消支付
            }
          });
        }
      })
    }
  }
  /*toPay(type) {
    if (type == 1) {
      this.getOrderInfo(this.data.alipay);
    } else if (type == 2) {
      this.getOrderInfo(this.data.upacp);

    } else if (type == 3) {
      this.getOrderInfo(this.data.weixin);
    }
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
      that.navCtrl.pop();
      if (result == 'cancel') {
        that.native.showToast("取消支付");
      } else {
        that.native.showToast("支付异常,请尝试其他支付方式");
      }
      console.log('fail', result, err)
    });*/
    /*——————————————————————————————————————————————————————————————————————————*/
    // pingpp.createPayment(data, (result) => {
    //   console.log('success',result);
    // }, function (err) {
    //   console.log(err);
    // });
    /*——————————————————————————————————————————————————————————————————————————*/
    // let that = this;
    // Pingpp.createPayment(data, (result, error) => {//scheme 为iOS返回应用
    //   console.log(result);
    //   console.log(error);
    //   alert('result' + result);
    //   alert('error' + error);
    //   that.navCtrl.push(AllOrdersPage);
    //   if (result == 'success') {
    //     that.native.showToast('支付成功');
    //   }
    // })
    // Pingpp.setDebugMode(true)
    // Pingpp.getVersion(function (version) {
    //   alert("当前SDK版本号是:" + version);
    // });
  // }

  // alipayPay(alipayOrder) {
  //   // Should get from server side with sign.
  //   this.alipay.pay(alipayOrder)
  //     .then(res => {
  //       console.log(res)
  //       this.payResult = res;
  //       switch (res.resultStatus) {
  //         case 9000: this.native.showToast('订单支付成功'); break;
  //         case 8000: this.native.showToast('正在处理中'); break;
  //         case 4000: this.native.showToast('订单支付失败'); break;
  //         case 5000: this.native.showToast('重复请求'); break;
  //         case 6001: this.native.showToast('中途取消'); break;
  //         case 6002: this.native.showToast('网络连接出错'); break;
  //         case 6004: this.native.showToast('支付结果未知'); break;
  //         default: this.native.showToast('其它支付错误'); break;
  //       }
  //       this.navCtrl.push(AllOrdersPage);
  //     }, err => {
  //       console.log(err)
  //       this.native.showToast('未知错误');
  //       this.payResult = err;
  //     })
  //     .catch(e => {
  //       console.log(e)
  //       this.native.showToast('未知错误');
  //       this.payResult = e;
  //     });
  // }
  // wechatPay(params) {
  //   Wechat.isInstalled(function (installed) {
  //     console.log("Wechat installed: " + (installed ? "Yes" : "No"));
  //   }, function (reason) {
  //     console.log("Failed: " + reason);
  //   });

  //   // See https://github.com/xu-li/cordova-plugin-wechat-example/blob/master/server/payment_demo.php for php demo
  //   /*var params = {
  //         partnerid: '10000100', // merchant id
  //         prepayid: 'wx201411101639507cbf6ffd8b0779950874', // prepay id
  //         noncestr: '1add1a30ac87aa2db72f57a2375d8fec', // nonce
  //         timestamp: '1439531364', // timestamp
  //         sign: '0CB01533B8C1EF103065174F50BCA001', // signed string
  //       };*/

  //   Wechat.sendPaymentRequest(params, function () {
  //     this.native.showToast('Success');
  //   }, function (reason) {
  //     console.log(reason);
  //   });
  // }
}
