import { Component } from '@angular/core';
import { NavController, NavParams, App, ModalController, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

/*
  Generated class for the My page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my',
  templateUrl: 'my.html'
})
export class MyPage {

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public app: App,
    public modalCtrl: ModalController,
    public storage:Storage
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPages');
  }
  Logout() {
    this.app.getRootNav().push(LoginPage);
    this.storage.set('hasLoggedIn',false);
  }
}
