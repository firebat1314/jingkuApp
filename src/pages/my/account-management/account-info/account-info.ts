import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { RealnamePage } from "./realname/realname";
import { QqPage } from "./qq/qq";
import { CompanynamePage } from "./companyname/companyname";
import { HttpService } from "../../../../providers/http-service";
import { AddressPage } from "./address/address";

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
  userInfo: any;
  RealnamePage = RealnamePage;
  QqPage = QqPage;
  CompanynamePage = CompanynamePage;
  AddressPage = AddressPage;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public events: Events
  ) {
    this.getUserData()
    this.events.subscribe('userInfo:editOk', () => {
      this.getUserData()
    })
  }
  getUserData() {
    this.httpService.userInfo().then((res) => {
      console.log(res);
      this.userInfo = res;
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountInfoPage');
  }
  ngOnDestroy(){
    this.events.unsubscribe('userInfo:editOk');
  }

}
