import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShopAllFashionPage } from "../shop-all-fashion/shop-all-fashion";

/**
 * Generated class for the ParticularsHomeDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-particulars-home-details',
  templateUrl: 'particulars-home-details.html',
})
export class ParticularsHomeDetailsPage {

  goShopFashion() {
    this.navCtrl.push(ShopAllFashionPage);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParticularsHomeDetailsPage');
  }

}
