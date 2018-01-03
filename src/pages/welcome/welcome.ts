import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
// import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';

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
    public storage: Storage,
    private statusBar: StatusBar,
  ) { }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  ionViewWillEnter(){
    this.statusBar.hide();
  }
  ionViewWillLeave(){
    this.statusBar.show();
  }
  goToHome() {
    this.navCtrl.setRoot('LoginPage',{},{animate:true,direction:'forward'});
    this.storage.set('has_entered', true);
  }
}
