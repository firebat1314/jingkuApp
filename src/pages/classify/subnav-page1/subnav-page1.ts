import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { HttpService } from "../../../providers/http-service";
/*
  Generated class for the SubnavPage1 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-subnav-page1',
  templateUrl: 'subnav-page1.html'
})
export class SubnavPage1Page {
  getCategorys: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubnavPage1Page');
  }
  ngOnInit() {
    this.httpService.getCategorys().then((res) => {
      this.getCategorys = res.data;
    })
  }
  gotwo(id) {
    this.navCtrl.push('SubnavPage2Page',{catId:id});
  }
}
