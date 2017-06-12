import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { PaymentMethodPage } from "../../my/all-orders/payment-method/payment-method";

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RechargePage');
    this.getAccountPayList();
  }
  getAccountPayList(){
    this.httpService.getAccountPayList().then((res)=>{
      if (res.status == 1) {
      }      
    })
  }
  onClick(money) {
    this.httpService.addAccount({ amount: money }).then((res) => {
      if (res.status == 1) {
        this.httpService.pay({ log_id: res.log_id ,type:'log'}).then((res) => {
          if (res.status == 1) {
            this.navCtrl.push(PaymentMethodPage, { data: res })
          }
        })
      }
    })
  }
}
