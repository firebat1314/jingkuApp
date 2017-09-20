import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ViewController } from 'ionic-angular';

/**
 * Generated class for the MoreMenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more-menu',
  templateUrl: 'more-menu.html',
})
export class MoreMenuPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoreMenuPage');
  }
  goMessagePage() {
    this.viewCtrl.dismiss((navCtrl) => {
      navCtrl.push('MessagePage')
    });
  }
  goHomePage() {
    this.viewCtrl.dismiss((navCtrl) => {
      navCtrl.parent.select(0);
      navCtrl.popToRoot();
    });
  }
  goClassPage() {
    this.viewCtrl.dismiss((navCtrl) => {
      navCtrl.parent.select(1);
      navCtrl.popToRoot();
    });
  }
  goCartPage() {
    this.viewCtrl.dismiss((navCtrl) => {
      navCtrl.parent.select(2);
      navCtrl.popToRoot();
    });

  }
  goMyPage() {
    this.viewCtrl.dismiss((navCtrl) => {
      navCtrl.parent.select(3);
      navCtrl.popToRoot();
    });

  }
  goAccountHistoryPage() {
    this.viewCtrl.dismiss((navCtrl) => {
      navCtrl.push('AccountHistoryPage')
    });
  }
  goAccountCollectGoodsPage(){
    this.viewCtrl.dismiss((navCtrl) => {
      navCtrl.push('AccountCollectGoodsPage')
    });
  }
  goSearchPage(){
    this.viewCtrl.dismiss((navCtrl) => {
      navCtrl.push('SearchPage')
    });
  }
}
