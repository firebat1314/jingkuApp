import { Component } from '@angular/core';
import {  NavParams } from 'ionic-angular';
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

  constructor( public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoreBrandPage');
  }
}
