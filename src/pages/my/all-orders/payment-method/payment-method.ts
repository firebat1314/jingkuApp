import { Component, Renderer, ElementRef, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { NavController, NavParams, ViewController, IonicPage, AlertController, Events } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";
import { Native } from "../../../../providers/native";
import { XimuProvider } from '../../../../providers/ximu/ximu';
// import { AllOrdersPage } from "../all-orders";

/*
  Generated class for the PaymentMethod page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var pingpp: any;
// declare var Pingpp: any;
// declare var Wechat: any;
// declare var navigator: any;

@IonicPage({
  segment: 'payment-method/:order_id/:log_id/:type'
})
@Component({
  selector: 'page-payment-method',
  templateUrl: 'payment-method.html'
})
export class PaymentMethodPage {
  data: any;
  order_id = this.navParams.get('order_id');
  log_id = this.navParams.get('log_id');
  type = this.navParams.get('type');
  user_money: string;//账户余额
  is_pay_pass: any;//是否设置支付密码

  yE: boolean = false;//是否使用余额
  bt: boolean = false;//是否使用白条

  paymentType: any;//支付方式
  payPassword: any;//用户支付密码
  canLeave: boolean = false;//能否离开

  end_time: any;//订单支付剩余时间

  // canBt: boolean;//能否白条支付

  isWeixin: boolean = this.native.isWeixin();
  isMobile: boolean = this.native.isMobile();

  @ViewChildren('totalprice') totalprice: QueryList<ElementRef>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public httpService: HttpService,
    public native: Native,
    public events: Events,
    public alertCtrl: AlertController,
    public ximu: XimuProvider,
    private renderer: Renderer,
    private el: ElementRef,
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentMethodPage');
    // this.navCtrl.remove(this.navCtrl.indexOf(this.navCtrl.getPrevious(this.navCtrl.last())),1);
  }
  ngOnInit() {
    this.getUserInfo();
    this.events.subscribe('ChangePayPasswordPage:editPaypwd', () => {
      this.yE = true;
      this.getUserInfo();
    });
  }
  ngAfterViewInit() {
    this.httpService.pay({ order_id: this.order_id, log_id: this.log_id, type: this.type }).then((res) => {
      if (res.status == 1) {
        this.data = res;
        this.end_time = res.order_info.end_time
      } else if (res.status == 0) {
        this.goAllOrdersPage();
      }
    })
    /* this.totalprice.changes.subscribe(data => data._results.forEach(e => {
      e.nativeElement.innerHTML = '1111'
      console.log(e.nativeElement.innerText)
    }));
    this.totalprice.notifyOnChanges(); */
  }
  ngOnDestroy() {
    this.events.unsubscribe('ChangePayPasswordPage:editPaypwd');
  }
  ionViewCanLeave() {
    let timer;
    return new Promise((resolve, reject) => {
      if (this.canLeave) {
        resolve(true);
      } else {
        let et = this.end_time % (24 * 3600);
        var alert = this.alertCtrl.create({
          title: '确认要离开收银台？',
          message: `您的订单在${Math.floor(et / 3600)}小时${(Math.floor((et % 3600) / 60))}分钟内未支付将被取消，请尽快完成支付。`,
          buttons: [
            {
              text: '继续支付',
              handler: () => {
                resolve(false);
              }
            },
            {
              text: '确认离开',
              handler: () => {
                resolve(true);
              }
            }
          ]
        })
        alert.present().then((e) => {
          /* let title = document.getElementsByClassName('alert-message')[0];
          let et = this.end_time % (24 * 3600);
          timer = setInterval(() => {
            console.log(et)
            title && (title.innerHTML = `您的订单在${Math.floor(et / 3600)}小时${(Math.floor((et % 3600) / 60))}分钟内未支付将被取消，请尽快完成支付。`);
          }, 1000) */
        });
        alert.onDidDismiss((a, b) => {
          // clearInterval(timer);
          resolve(false);
        })
      }
    }).then((res) => {
      return res;
    });
  }
  goAllOrdersPage() {
    this.events.publish('allOrders:update');
    this.events.publish('my:update');
    this.canLeave = true;
    if (this.navCtrl.getPrevious() && this.navCtrl.getPrevious().id == 'AllOrdersPage') {
      this.navCtrl.pop();
    } else {
      setTimeout(() => {
        this.pushPage('AllOrdersPage');
      }, 100);
    }
  }
  pushPage(page) {
    var nav = this.navCtrl.last();
    this.navCtrl.push(page).then(() => {
      this.navCtrl.removeView(nav, { animate: false });
    });
  }
  getUserInfo() {
    this.httpService.userInfo().then((res) => {//检查是否有支付密码
      if (res.status) {
        this.user_money = res.data.user_money;
        this.is_pay_pass = res.data.is_pay_pass;
      }
    })
  }
  useYue() {
    this.yE = !this.yE;
    if (this.yE) {
      this.bt = false;
      if (!this.is_pay_pass) {
        this.alertCtrl.create({
          title: '提示',
          subTitle: '还没有设置支付密码请前往设置',
          message: '',
          enableBackdropDismiss: false,
          buttons: [
            {
              text: '确定',
              handler: () => {
                this.yE = false;
                this.canLeave = true;
                this.navCtrl.push('ChangePayPasswordPage');
              }
            }, {
              text: '取消',
              handler: () => {
                this.yE = false;
              }
            }
          ]
        }).present();
      }
    }
  }
  useBt() {
    this.bt = !this.bt;
    if (this.bt) {
      this.paymentType = null;
      this.yE = false;
    }
  }
  toPay() {
    // this.navCtrl.remove()
    if (!this.yE && !this.paymentType && !this.bt) {
      this.native.showToast('请选择支付方式');
      return
    }

    if (this.yE) {//使用余额
      this.httpService.checkPayPass({ password: this.payPassword }).then((res) => {//验证密码
        if (res.status) {
          if (this.paymentType) {
            this.userBalance(this.data[this.paymentType]);
          } else {
            this.userBalance(this.data.alipay);
          }
        }
      })
    } else if (this.bt) {//使用白条
      this.httpService.loan_status().then((res) => {
        if (!res.status) {
          this.canLeave = true;
          this.navCtrl.push('BtAuthorizationPage').then(()=>{
            this.canLeave = false;
          });
        } else {
          this.httpService.ximu_order({ order_id: this.order_id }).then((res) => {
            if (res.status) {
              this.ximu.openXimu(res.data.url, (res) => {
                if (res == 1) {
                  this.httpService.ximuIsPay({ order_id: this.order_id }).then((res) => {
                    if (res.status) {
                      this.goAllOrdersPage();
                    }
                  })
                }
              });
            }
          })
        }
      })

    } else {//不使用余额
      this.noUserBalance(this.data[this.paymentType]);
    }
  }
  /**
   * 使用余额
   * @param data pingxx
   */
  userBalance(data) {
    this.httpService.doublePayment({ code: data }).then((res) => {
      if (res.status) {
        if (res.type == 'balance') {
          this.native.showToast(res.info);

          this.goAllOrdersPage();

        } else if (res.type == 'pay') {
          if (this.paymentType) {
            this.openPingPayment(res);
          } else {
            this.native.showToast('余额不足，请选择其他支付方式');
          }
        }
      }
    })
  }
  /**
   * 不使用余额
   * @param data pingxx
   */
  noUserBalance(data) {
    this.httpService.payCode({ code: data }).then((res) => {
      if ((res.status == 1)) {
        // this.wechatPay(res.pingxx)
        this.openPingPayment(res);
      }
    })
  }
  openPingPayment(data) {
    let that = this;
    if (this.native.isMobile()) {
      (<any>window).Pingpp.createPayment(data.pingxx, (result, error) => {//scheme 为iOS返回应用
        console.log('result' + result);
        console.log('error' + error);
        if (result == 'success') {
          this.goAllOrdersPage();
          that.native.showToast('支付成功');
        } else {
          that.native.showToast('支付失败');
        }
      })
    } else {
      if (this.paymentType == 'weixin') {
        this.canLeave = true;
        location.href = data.url;
      } else {
        pingpp.createPayment(data.pingxx, function (result, err) {

          console.log(result, err)
          if (result == "success") {
            // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
          } else if (result == "fail") {
            // charge 不正确或者微信公众账号支付失败时会在此处返回
            that.native.showToast("支付异常");
          } else if (result == "cancel") {
            // 微信公众账号支付取消支付
          }
        });
      }
    }
  }
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
