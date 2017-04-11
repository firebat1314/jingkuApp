import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";

/*
  Generated class for the PaymentMethod page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-payment-method',
  templateUrl: 'payment-method.html'
})
export class PaymentMethodPage {
  data = this.navParams.get('data');

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public httpService:HttpService) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentMethodPage');
  }
  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }
  toPay(type){
    if(type==1){
      this.httpService.payCode({ code: this.data.alipay }).then((res)=>{
        console.log(res);
      })
    }else if(type==2){
      this.httpService.payCode({ code: this.data.upacp }).then((res)=>{
        console.log(res);
      })
    }else if(type==3){
      this.httpService.payCode({ code: this.data.WeChat }).then((res)=>{
        console.log(res);
        
      })
    }
  }
}
