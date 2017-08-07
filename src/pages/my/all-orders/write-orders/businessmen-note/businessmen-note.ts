import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

/**
 * Generated class for the BusinessmenNotePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-businessmen-note',
  templateUrl: 'businessmen-note.html',
})
export class BusinessmenNotePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessmenNotePage');
  }

}
