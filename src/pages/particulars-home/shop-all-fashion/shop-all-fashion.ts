import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ShopAllFashionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  segment:'shop-all-fashion/:shopdata'
})
@Component({
  selector: 'page-shop-all-fashion',
  templateUrl: 'shop-all-fashion.html',
})
export class ShopAllFashionPage {

  shopdata = this.navParams.get('shopdata');
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopAllFashionPage');
  }

}
