import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the DuihuanDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-duihuan-details',
  templateUrl: 'duihuan-details.html'
})
export class DuihuanDetailsPage {
  selectPicArguments = 'pic';
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DuihuanDetailsPage');
  }
  doConvertibility() {

  }
}
