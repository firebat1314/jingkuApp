import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";

/*
  Generated class for the PaymentMethod page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var cordova: any;
declare var pingpp: any;

@Component({
  selector: 'page-payment-method',
  templateUrl: 'payment-method.html'
})
export class PaymentMethodPage {
  data = this.navParams.get('data');

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public httpService: HttpService) {

  }

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
          pingpp.createPayment(res.pingxx, function(result, err){
            console.log(result,err)
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
          pingpp.createPayment(res.pingxx, function(result, err){
            console.log(result,err)
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
          pingpp.createPayment(res.pingxx, function(result, err){
            console.log(result,err)
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
        if (res.status == 1 && pingpp) {
          console.log(pingpp);
          pingpp.createPayment(res.pingxx, function (e) {
            console.log(e || 111)
          }, function (err) {
            console.log(err)
          });
        }

      })

    } else if (type == 2) {

    } else if (type == 3) {

    }
  }
}
