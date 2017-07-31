import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ShopAllFashionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shop-all-fashion',
  templateUrl: 'shop-all-fashion.html',
})
export class ShopAllFashionPage {

  brandList = this.navParams.get('brandList');
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.brandList)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopAllFashionPage');
  }

}
