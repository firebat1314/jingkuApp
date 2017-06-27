import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the StoreTabsPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-store-tabs',
  templateUrl: 'store-tabs.html'
})
@IonicPage()
export class StoreTabsPage {

  storeTabsHomeRoot = 'StoreTabsHomePage'
  storeTabsAllgoodsRoot = 'StoreTabsAllgoodsPage'
  storeTabsActivityRoot = 'StoreTabsActivityPage'
  storeTabsNewonRoot = 'StoreTabsNewonPage'


  constructor(public navCtrl: NavController) {}

}
