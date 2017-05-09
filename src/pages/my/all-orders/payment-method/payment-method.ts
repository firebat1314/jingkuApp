import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";
import { Alipay } from '@ionic-native/alipay';
import { Native } from "../../../../providers/native";

/*
  Generated class for the PaymentMethod page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var pingpp: any;
declare var Pingpp: any;
declare var Wechat: any;

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
    private alipay: Alipay,
    public viewCtrl: ViewController,
    public httpService: HttpService,
    public native: Native
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentMethodPage');
  }
  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }
  /*toPay(type) {
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
  }*/

  toPay(type) {
    if (type == 1) {
      this.httpService.payCode({ code: this.data.alipay }).then((res) => {
        console.log(res);
        if ((res.status == 1)) {  
          this.alipayPay(res.pingxx)
          // this.pay(res.pingxx);
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
      this.httpService.payCode({ code: this.data.weixin }).then((res) => {
        console.log(res);
        if ((res.status == 1)) {
          this.wechatPay(res.pingxx)
          // this.pay(res.pingxx);
        }
      })
    }
  }
/*  pay(data) {
    Pingpp.createPayment({ "object": data, "urlScheme": "http://www.baidu.com" }, function (result, error) {//scheme 为iOS返回应用
      console.log(result);
      console.log(error);
    });
  }*/

  alipayPay(alipayOrder) {
    // Should get from server side with sign.
    this.alipay.pay(alipayOrder)
      .then(res => {
        console.log(res)
        this.payResult = res;
      }, err => {
        console.log(err)
        this.payResult = err;
      })
      .catch(e => {
        console.log(e)
        this.payResult = e;
      });
  }
  wechatPay(params) {
    Wechat.isInstalled(function (installed) {
      console.log("Wechat installed: " + (installed ? "Yes" : "No"));
    }, function (reason) {
      console.log("Failed: " + reason);
    });

    // See https://github.com/xu-li/cordova-plugin-wechat-example/blob/master/server/payment_demo.php for php demo
    /*var params = {
          partnerid: '10000100', // merchant id
          prepayid: 'wx201411101639507cbf6ffd8b0779950874', // prepay id
          noncestr: '1add1a30ac87aa2db72f57a2375d8fec', // nonce
          timestamp: '1439531364', // timestamp
          sign: '0CB01533B8C1EF103065174F50BCA001', // signed string
        };*/

    Wechat.sendPaymentRequest(params, function () {
       this.native.showToast('Success');
    }, function (reason) {
       console.log(reason);
    });
  }
}
