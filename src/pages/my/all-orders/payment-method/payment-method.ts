import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";

/*
  Generated class for the PaymentMethod page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var pingpp: any;
declare var Pingpp: any;
@Component({
  selector: 'page-payment-method',
  templateUrl: 'payment-method.html'
})
export class PaymentMethodPage {
  data = this.navParams.get('data');

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public httpService: HttpService) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentMethodPage');
  }
  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }
  /* toPay(type) {
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
          this.pay(res.pingxx);
        }
      })
    } else if (type == 2) {
      this.httpService.payCode({ code: this.data.upacp }).then((res) => {
        console.log(res);
        if ((res.status == 1)) {
          this.pay(res.pingxx);
        }
      })
    } else if (type == 3) {
      this.httpService.payCode({ code: this.data.WeChat }).then((res) => {
        console.log(res);
        if ((res.status == 1)) {
          this.pay(res.pingxx);
        }
      })
    }
  }
  pay(data) {
    var obj = {
      "id": "ch_HCuPKS0yDazPOubLqPn5CeTO",
      "object": "charge",
      "created": 1492480831,
      "livemode": true,
      "paid": false,
      "refunded": false,
      "app": "app_OSef1SSmP0O4WnPO",
      "channel": "alipay_wap",
      "order_no": "15493",
      "client_ip": "114.252.82.59",
      "amount": 249900,
      "amount_settle": 249900,
      "currency": "cny",
      "subject": "mobile:DD-DD-12578",
      "body": "订单商品：华为 荣耀8 手机 珠光白 全网通4G(4GRAM+64GROM) 标配版",
      "extra": {
        "success_url": "http://v213m.jingkoo.net/alipay.php",
        "new_version": true,
        "app_pay": true
      },
      "time_paid": null,
      "time_expire": 1492567231,
      "time_settle": null,
      "transaction_no": null,
      "refunds": {
        "object": "list",
        "url": "/v1/charges/ch_HCuPKS0yDazPOubLqPn5CeTO/refunds",
        "has_more": false,
        "data": []
      },
      "amount_refunded": 0,
      "failure_code": null,
      "failure_msg": null,
      "metadata": [],
      "credential": {
        "object": "credential",
        "alipay_wap": {
          "channel_url": "https://mapi.alipay.com/gateway.do",
          "service": "alipay.wap.create.direct.pay.by.user",
          "notify_url": "https://notify.pingxx.com/notify/charges/ch_HCuPKS0yDazPOubLqPn5CeTO",
          "partner": "2088221475924880",
          "out_trade_no": "15493",
          "subject": "mobile:DD-DD-12578",
          "body": "订单商品：华为 荣耀8 手机 珠光白 全网通4G(4GRAM+64GROM) 标配版 ch_HCuPKS0yDazPOubLqPn5CeTO",
          "total_fee": "2499.00",
          "payment_type": 1,
          "seller_id": "2088221475924880",
          "it_b_pay": "2017-04-19 10:00:31",
          "return_url": "http://v213m.jingkoo.net/alipay.php",
          "app_pay": "Y",
          "sign": "iI0U1ILfGKBWaKON2TU1R1J33Orw1+whCU165yfgevms7wilfn/eme0GV5ZGxpYaywTCI/a2/1O8Y0KwPVf3bQ7t752nVpMThlE7jM008kic1Fn8lYbMgE6iYb+bsrP7bVLa3jp68KNhKNX9NV1vaYia4vB3YEeQ0z0CcPuCCJo=",
          "sign_type": "RSA"
        }
      },
      "description": null
    }
    console.log(obj)
    if (pingpp) {
      pingpp.createPayment(obj, function (result, error) {
        console.log('succss', result);
        console.log('error', error);
      });
    }
  }
}
