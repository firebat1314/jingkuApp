import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ForgotTwoPage } from '../forgot/forgot-two/forgot-two';


/*
  Generated class for the Forgot page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html'
})
export class ForgotPage {
  public secondPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.secondPage = ForgotTwoPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPage');
  }

}
