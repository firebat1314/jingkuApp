import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";
import { Alipay, AlipayOrder } from '@ionic-native/alipay';

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
          /*res.pingxx.extra = {
            extern_token: '',
            hb_fq_num: '',//使用花呗分期要进行的分期数
            hb_fq_seller_percent: '',//使用花呗分期需要卖家承担的手续费比例的百分值，传入100代表100%
            disable_pay_channels: '',//禁用支付渠道，用户不可用指定渠道支付，当有多个付款渠道时用,分隔（如moneyFund,credit_group）
            sys_service_provider_id: '',//请填写系统商签约协议的 PID。
            rn_check: 'T',//适用于支付宝 1.0，是否发起实名校验，T 代表发起实名校验；F 代表不发起实名校验。
            need_buyer_real_named: 'T',//是否发起实名校验 ，T 代表发起实名校验；F 代表不发起实名校验。
            // buyer_account: '',//款用户的支付宝账号。
            // fund_bill_list: '',//交易支付使用的资金渠道
            // buyer_user_id: '',//买家在支付宝的用户 id
            // voucher_detail_list: ''//本交易支付时使用的所有优惠券信息
          }*/
          this.pay(res.pingxx);
        }
      })
    } else if (type == 2) {
      this.httpService.payCode({ code: this.data.upacp }).then((res) => {
        console.log(res);
        if ((res.status == 1)) {
         /* res.pingxx.extra = {
            limit_pay: '',//指定支付方式，指定不能使用信用卡支付可设置为  no_credit 。
            goods_tag: ''//商品标记，代金券或立减优惠功能的参数。
            // open_id 支付完成后额外返回付款用户的微信  open_id 。
            // bank_type 支付完成后额外返回付款用户的付款银行类型  bank_type 。
          }*/
          this.pay(res.pingxx);
        }
      })
    } else if (type == 3) {
      this.httpService.payCode({ code: this.data.weixin }).then((res) => {
        console.log(res);
        if ((res.status == 1)) {
          this.pay(res.pingxx);
        }
      })
    }
  }
  pay(data) {
    Pingpp.createPayment({ "object": data, "urlScheme": "http://www.baidu.com" }, function (result, error) {//scheme 为iOS返回应用
      console.log(result);
      console.log(error);
    });
  }
}
