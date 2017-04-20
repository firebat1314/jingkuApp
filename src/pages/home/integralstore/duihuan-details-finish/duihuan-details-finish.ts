import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IntegralstorePage } from "../integralstore";

/*
  Generated class for the DuihuanDetailsFinish page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-duihuan-details-finish',
  templateUrl: 'duihuan-details-finish.html'
})
export class DuihuanDetailsFinishPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DuihuanDetailsFinishPage');
  }
  goIntegralstorePage(){
    this.navCtrl.popTo(IntegralstorePage)
  }
}
