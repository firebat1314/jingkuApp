import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SubnavPage2Page } from '../subnav-page2/subnav-page2'
/*
  Generated class for the SubnavPage1 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-subnav-page1',
  templateUrl: 'subnav-page1.html'
})
export class SubnavPage1Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubnavPage1Page');
  }
  gotwo(){
    this.navCtrl.push(SubnavPage2Page);
  }
}
