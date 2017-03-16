import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddShippingAddressPage } from "../add-shipping-address/add-shipping-address";

/*
  Generated class for the ShippingAddress page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-shipping-address',
  templateUrl: 'shipping-address.html'
})
export class ShippingAddressPage {
  AddShippingAddressPage:any = AddShippingAddressPage
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShippingAddressPage');
  }

}
