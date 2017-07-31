import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ViewController } from 'ionic-angular';

/**
 * Generated class for the StoreHomePopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-store-home-popover',
  templateUrl: 'store-home-popover.html',
})
export class StoreHomePopoverPage {

  data: any = this.navParams.get('data')
  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoreHomePopoverPage');
  }

}
