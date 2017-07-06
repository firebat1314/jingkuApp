import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
// import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Welcome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage
  ) { }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  goToHome() {
    this.navCtrl.setRoot('LoginPage');
    this.storage.set('firstIn', 'NO');
  }
}
