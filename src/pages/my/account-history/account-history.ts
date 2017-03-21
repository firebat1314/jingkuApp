import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,Content } from 'ionic-angular';

/*
  Generated class for the AccountHistory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-account-history',
  templateUrl: 'account-history.html'
})
export class AccountHistoryPage {
showCheckBox:boolean = false;
@ViewChild(Content) content:Content;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountHistoryPage');
  }
  showCheckBoxChange(){
    this.showCheckBox = !this.showCheckBox;
    this.content.resize();
  }
}
