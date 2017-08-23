import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
// import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { AndroidFullScreen } from "@ionic-native/android-full-screen";

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
    public androidFullScreen: AndroidFullScreen,
  ) { }
  ngOnInit() {
    // this.androidFullScreen.isImmersiveModeSupported()
    //   .then(() => this.androidFullScreen.immersiveMode())
    //   .catch((error: any) => console.log(error));
  }
  ngOnDestroy() {
    // this.androidFullScreen.showSystemUI();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  goToHome() {
    this.navCtrl.setRoot('LoginPage',{},{animate:true,direction:'forward'});
    this.storage.set('firstIn', false);
  }
}
