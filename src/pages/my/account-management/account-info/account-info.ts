import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RealnamePage } from "./realname/realname";
import { QqPage } from "./qq/qq";
import { CompanynamePage } from "./companyname/companyname";

/*
  Generated class for the AccountInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-account-info',
  templateUrl: 'account-info.html'
})
export class AccountInfoPage {
  RealnamePage = RealnamePage;
  QqPage = QqPage;
  CompanynamePage = CompanynamePage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountInfoPage');
  }
  
}
