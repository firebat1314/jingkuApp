import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";
import { Native } from '../../../../providers/native';

/**
 * Generated class for the OrderWuliuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  segment: 'order-wuliu/:orderId'
})
@Component({
  selector: 'page-order-wuliu',
  templateUrl: 'order-wuliu.html',
})
export class OrderWuliuPage {
  data: any;
  orderId = this.navParams.get('orderId');

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public native: Native,
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderWuliuPage');
  }

  ionViewCanEnter() {
    return this.httpService.getWuLiu({ order_id: this.orderId }).then((res) => {
      if (res.status) {
        this.data = res;
        /* for (let i = 0; i < res.length; i++) {
          const element = res[i];
          if(element.state){
            
          }
        } */
      }else{
        return false;
      }
    })
  }
}
