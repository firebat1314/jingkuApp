import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AppAdvertisingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-app-advertising',
  templateUrl: 'app-advertising.html',
})
export class AppAdvertisingPage {
  timer: any;
  timeDown: number = 3;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
  ) { }

  ngOnInit() {
    this.timer = setInterval((e) => {
      if (this.timeDown === 1) {
        this.jumpOver();
      } else {
        this.timeDown--
      }
    }, 1000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppAdvertisingPage');
  }

  ngOnDestroy() {
  }

  jumpOver() {
    clearInterval(this.timer);
    this.storage.get('hasLoggedIn').then((result) => {
      if (result) {
        this.navCtrl.setRoot('TabsPage', {}, { animate: true, animation: 'md-transition', direction: 'forward' });
      } else {
        this.navCtrl.setRoot('LoginPage', {}, { animate: true, animation: 'md-transition', direction: 'forward' });
      }
    });
  }

}
