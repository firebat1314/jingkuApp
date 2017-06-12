import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { ClickBanner } from "../../../providers/ClickBanner";

/*
  Generated class for the MoreBrand page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-more-brand',
  templateUrl: 'more-brand.html'
})
export class MoreBrandPage {
  data = this.navParams.get('data');

  adClick: ClickBanner = new ClickBanner(this.navCtrl, this.events);

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoreBrandPage');
  }
}
