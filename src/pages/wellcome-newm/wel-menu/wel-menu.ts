import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ViewController } from 'ionic-angular';
import { welpage_selected } from '../../../providers/constants';


/**
 * Generated class for the WelMenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wel-menu',
  templateUrl: 'wel-menu.html',
})
export class WelMenuPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
		public viewCtrl: ViewController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelMenuPage');
  }
  

  dismiss(page){
    this.viewCtrl.dismiss((nav)=>{
      nav.push(page);
    });
  }
}
