import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrderPayOverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-pay-over',
  templateUrl: 'order-pay-over.html',
})
export class OrderPayOverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPayOverPage');
  }

  finishBtn(){
    if(this.navCtrl.getPrevious()){
      this.navCtrl.pop();
    }else{

    }
  }
  goHome(){
    
  }
  goAllorder(){}
}
