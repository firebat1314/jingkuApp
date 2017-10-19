import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Native } from "../../../providers/native";

/**
 * Generated class for the MySalesmanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-salesman',
  templateUrl: 'my-salesman.html',
})
export class MySalesmanPage {

  salesman: any = this.navParams.get('salesman');


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public native: Native,
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MySalesmanPage');
  }
  callNumber() {
    if (this.salesman.phone) {
      if (this.native.isMobile()) {
        this.native.openCallNumber(this.salesman.phone, false);
      } else {
        window.location.href = 'tel:' + this.salesman.phone;
      }
    } else {
      this.native.showToast('无手机号');
    }
  }
}
