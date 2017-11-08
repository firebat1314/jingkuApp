import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";

/*
  Generated class for the Recharge page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var navigator: any;
declare var pingpp: any;

@IonicPage()
@Component({
  selector: 'page-recharge',
  templateUrl: 'recharge.html'
})
export class RechargePage {
  payCode: any;
  payList: any;

  payMethod: string = 'wx';
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
      if (res.status) {
        this.payList = res;
      }
    })
  }
  onSubmit(money, type) {
    this.httpService.rechargeMoney({ amount: money, pay: type, note: '' }).then((res) => {
      if (res.status) {
        this.openPingPayment(res);
      }
    })
  }
  // this.httpService.addAccount({ amount: money, payment_id: 6 }).then((res) => {
  //   if (res.status == 1) {
  //     this.httpService.pay({ log_id: res.log_id, type: 'log' }).then((res) => {
  //       if (res.status == 1) {
  //         this.payCode = res;
  //         if (type == 'wx') {
  //           this.getOrderInfo(this.payCode.weixin);
  //         } else if (type == 'alipay') {
  //           this.getOrderInfo(this.payCode.alipay);
  //         } else if (type == 'upacp') {
  //           this.getOrderInfo(this.payCode.upacp);
  //         } else if (type == "银行汇款/转账") {
  //           this.httpService.addAccount({ amount: money, payment_id: 4 }).then((res) => {
  //             if (res.status == 1) {
  //               this.alertCtrl.create({
  //                 title: '汇款须知',
  //                 subTitle: this.payList.data[0].pay_desc,
  //                 buttons: [/* {
  //                   text: '个人中心',
  //                   handler: () => {
  //                     this.navCtrl.parent.select(3);
  //                     this.navCtrl.pop();
  //                   }
  //                 }, */ {
  //                     text: '确认'
  //                   }],
  //                 cssClass: 'recharge-alert'
  //               }).present();
  //             }
  //           })
  //         }
  //       }
  //     })
  //   }
  // })
  money: any;
  openPingPayment(data) {
    if (this.native.isMobile()) {
      let that = this;
      (<any>window).Pingpp.createPayment(data.pingxx, (result, error) => {//scheme 为iOS返回应用
        console.log('result' + result);
        console.log('error' + error);
        if (result == 'success') {
          this.money = 0;
          that.native.showToast('充值成功');
          this.navCtrl.parent.select(3);
          this.navCtrl.setPages([{ page: 'NewMyPage' }, { page: 'AccountMoneyDetailPage' }])
        } else {
          that.native.showToast('充值失败');
        }
      })
    } else {
      if (this.payMethod == 'wx_pub') {
        location.href = data.url;
      } else {
        pingpp.createPayment(data.pingxx, (result, err) => {
          console.log(result, err)
          if (result == "success") {
            // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
          } else if (result == "fail") {
            // charge 不正确或者微信公众账号支付失败时会在此处返回
            this.native.showToast("支付异常");
          } else if (result == "cancel") {
            // 微信公众账号支付取消支付
          }
        });
      }
    }
  }
}
