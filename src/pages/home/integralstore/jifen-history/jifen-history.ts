import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DuihuanDetailsFinishPage } from "../duihuan-details-finish/duihuan-details-finish";

/*
  Generated class for the JifenHistory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-jifen-history',
  templateUrl: 'jifen-history.html'
})
export class JifenHistoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad JifenHistoryPage');
  }

  goDuihuanDetailsFinishPage(id){
    this.navCtrl.push(DuihuanDetailsFinishPage,{id:id})
  }
}
