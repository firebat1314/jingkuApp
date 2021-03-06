import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailErweimaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail-erweima',
  templateUrl: 'detail-erweima.html',
})
export class DetailErweimaPage {
  data = this.navParams.data;
  qrcode = this.navParams.get('qrcode');
  name = this.navParams.get('name');
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailErweimaPage');
  }

}
