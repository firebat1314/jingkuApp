import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Alipay, AlipayOrder } from '@ionic-native/alipay';
import { HttpService } from "../../../providers/http-service";

@Component({
  selector: 'page-presell',
  templateUrl: 'presell.html'
})
export class PresellPage {
  getCategorys: any;
  payInfo: any;
  payResult: any;

  checkedIndex:number=0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alipay: Alipay,
    private httpService: HttpService
  ) {
    this.httpService.getCategorys().then((res) => {
      if (res.status == 1) { this.getCategorys = res.data; }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PresellPage');
  }
  getList(index) {
    let id = this.getCategorys[index].cat_id;
    this.checkedIndex=index;
  }

  goToPay() {
    // Should get from server side with sign.
    const alipayOrder: AlipayOrder = {
      /**
     * appId assigned by Alipay
     */
      app_id: '2088221475924880',
      /**
       * Api name.
       * Should be: alipay.trade.app.pay
       */
      method: 'alipay.trade.app.pay',
      /**
       * Data format
       * Default: "JSON"
       */
      format: 'JSON',
      /**
       * Charset
       * Possible values: "UTF-8", "GBK"
       * Default: "UTF-8"
       */
      charset: 'UTF-8',
      /**
       * Sign method
       * Default: 'RSA'
       */
      sign_type: 'RSA',
      /**
       * Sign value. Should be got from server side.
       * Default: 'RSA'
       */
      sign: 'RSA',
      /**
       * Timestamp, formated like "yyyy-MM-dd HH:mm:ss", e.g. 2014-07-24 03:07:50
       */
      timestamp: '',
      /**
       * Api version. Fixed value '1.0'
       */
      version: '1.0',
      /**
       * Notify url.
       */
      notify_url: '',
      /**
       * biz content. formated in json. see alipay doc for detail.
       */
      biz_content: ''
    };
    this.alipay.pay(alipayOrder)
      .then(res => {
        console.log('seccuss', res);
        this.payResult = res;
      }, err => {
        console.log('err', err);
        this.payResult = err;
      })
      .catch(e => {
        console.log('错误', e);
        this.payResult = e;
      });
  }
}
